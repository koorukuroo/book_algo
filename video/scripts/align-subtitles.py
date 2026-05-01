"""
Align ground-truth narration scripts to ElevenLabs MP3s using WhisperX.

Usage:
  python scripts/align-subtitles.py ch01
  python scripts/align-subtitles.py ch01 ch02 ...
  python scripts/align-subtitles.py --all
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from faster_whisper import WhisperModel
import whisperx


ROOT = Path(__file__).resolve().parents[1]
NARRATION_DIR = ROOT / "scripts" / "narrations"
AUDIO_ROOT = ROOT / "public" / "audio"
SUBTITLE_DIR = ROOT / "src"
DIFF_DIR = ROOT / "scripts"

DEVICE = "cpu"
COMPUTE_TYPE = "int8"
WHISPER_MODEL = "small"
ALIGN_LANG = "ko"

MAX_CUE_CHARS = 22
MAX_CUE_DURATION = 4.0
MIN_CUE_DURATION = 0.8


def normalize(s: str) -> str:
    return re.sub(r"[\s\W_]+", "", s).lower()


def sanity_transcribe(model: WhisperModel, audio_path: Path) -> str:
    segments, _ = model.transcribe(str(audio_path), language="ko", vad_filter=False)
    return " ".join(seg.text.strip() for seg in segments)


def align_scene(audio_path: Path, text: str, align_model, align_meta) -> list[dict]:
    audio = whisperx.load_audio(str(audio_path))
    duration = len(audio) / whisperx.audio.SAMPLE_RATE
    pseudo_segments = [{"text": text, "start": 0.0, "end": duration}]
    result = whisperx.align(
        pseudo_segments,
        align_model,
        align_meta,
        audio,
        device=DEVICE,
        return_char_alignments=False,
    )
    return result.get("word_segments", [])


def split_sentences(text: str) -> list[str]:
    """Split Korean text on sentence-final punctuation, keeping the punct."""
    # Matches a sentence ending followed by whitespace OR end of string.
    parts = re.split(r"(?<=[.!?。])\s+", text.strip())
    return [p.strip() for p in parts if p.strip()]


def chunk_by_length(text: str, max_chars: int) -> list[str]:
    """Greedy-pack space-separated tokens into chunks <= max_chars."""
    tokens = text.split()
    chunks: list[str] = []
    cur: list[str] = []
    cur_len = 0
    for tok in tokens:
        added = cur_len + len(tok) + (1 if cur else 0)
        if added > max_chars and cur:
            chunks.append(" ".join(cur))
            cur = [tok]
            cur_len = len(tok)
        else:
            cur.append(tok)
            cur_len = added
    if cur:
        chunks.append(" ".join(cur))
    return chunks


def map_sentences_to_cues(
    words: list[dict],
    tts_text: str,
    display_text: str,
    scene_start_frame: int,
    fps: int,
) -> list[dict] | None:
    """Inherit timing from tts_text alignment, but emit cues using display_text.

    Returns None if sentence counts don't match (caller should fall back to
    plain word grouping on the spoken form).
    """
    tts_sents = split_sentences(tts_text)
    disp_sents = split_sentences(display_text)
    if not tts_sents or len(tts_sents) != len(disp_sents):
        return None

    cues: list[dict] = []
    word_idx = 0
    for tts_sent, disp_sent in zip(tts_sents, disp_sents):
        n_words = len(tts_sent.split())
        if word_idx >= len(words):
            break
        n_words = min(n_words, len(words) - word_idx)
        sent_words = words[word_idx : word_idx + n_words]
        word_idx += n_words

        starts = [w.get("start") for w in sent_words if w.get("start") is not None]
        ends = [w.get("end") for w in sent_words if w.get("end") is not None]
        if not starts or not ends:
            continue
        sent_start = starts[0]
        sent_end = ends[-1]

        chunks = chunk_by_length(disp_sent, MAX_CUE_CHARS)
        # Distribute time proportionally to non-space character count
        total_chars = sum(len(c.replace(" ", "")) for c in chunks) or 1
        cur_t = sent_start
        for c in chunks:
            char_count = len(c.replace(" ", ""))
            duration = (sent_end - sent_start) * (char_count / total_chars)
            cue_end = cur_t + duration
            cues.append({
                "text": c,
                "fromFrame": scene_start_frame + int(cur_t * fps),
                "toFrame": scene_start_frame + int(cue_end * fps),
            })
            cur_t = cue_end
    return cues


def group_words(words: list[dict], scene_start_frame: int, fps: int) -> list[dict]:
    cues: list[dict] = []
    buf: list[dict] = []
    buf_chars = 0

    def flush():
        nonlocal buf, buf_chars
        if not buf:
            return
        text = " ".join(w["word"] for w in buf).strip()
        start = buf[0].get("start")
        end = buf[-1].get("end")
        if start is None or end is None:
            buf = []
            buf_chars = 0
            return
        cues.append({
            "text": text,
            "fromFrame": scene_start_frame + int(start * fps),
            "toFrame": scene_start_frame + int(end * fps),
        })
        buf = []
        buf_chars = 0

    for w in words:
        token = w.get("word", "")
        if not token:
            continue
        token_len = len(token)
        if buf:
            buf_start = buf[0].get("start")
            cur_end = w.get("end") or w.get("start")
            if buf_start is not None and cur_end is not None and (cur_end - buf_start) > MAX_CUE_DURATION:
                flush()
        if buf_chars + token_len > MAX_CUE_CHARS and buf:
            flush()
        buf.append(w)
        buf_chars += token_len
        if re.search(r"[.!?。…]$", token):
            flush()
    flush()

    merged: list[dict] = []
    for c in cues:
        if merged and (c["toFrame"] - c["fromFrame"]) / fps < MIN_CUE_DURATION:
            merged[-1]["text"] += c["text"]
            merged[-1]["toFrame"] = c["toFrame"]
        else:
            merged.append(dict(c))
    return merged


def chapters_to_run(argv: list[str]) -> list[str]:
    if not argv or "--all" in argv:
        return sorted(p.stem for p in NARRATION_DIR.glob("*.json"))
    return argv


def align_chapter(chapter: str, whisper_model: WhisperModel, align_model, align_meta) -> None:
    script_path = NARRATION_DIR / f"{chapter}.json"
    if not script_path.exists():
        print(f"[skip] {chapter}: no script")
        return
    config = json.loads(script_path.read_text(encoding="utf-8"))
    fps = config["fps"]
    audio_dir = AUDIO_ROOT / chapter
    diff_lines: list[str] = []
    out_cues: list[dict] = []

    print(f"[chapter] {chapter}")
    for scene in config["scenes"]:
        sid = scene["id"]
        audio_path = audio_dir / f"{sid}.mp3"
        if not audio_path.exists():
            print(f"  [skip] missing {audio_path.relative_to(ROOT)}")
            continue
        scene_from = scene["from"]
        text = scene["text"]
        tts_text = scene.get("tts_text") or text
        print(f"  [align] {sid}")

        try:
            asr_text = sanity_transcribe(whisper_model, audio_path)
        except Exception as exc:
            asr_text = f"<ASR failed: {exc}>"
        sim = 1 - (abs(len(normalize(asr_text)) - len(normalize(tts_text))) /
                   max(len(normalize(tts_text)), 1))
        diff_lines.append(
            f"=== {chapter}/{sid} (length-sim={sim:.2f}) ===\n[script] {tts_text}\n[whisper] {asr_text}\n"
        )

        # Force-align against the spoken form (tts_text) — that's what the
        # audio actually contains.
        words = align_scene(audio_path, tts_text, align_model, align_meta)
        if not words:
            out_cues.append({
                "scene": sid,
                "text": text,
                "fromFrame": scene_from,
                "toFrame": scene_from + scene["duration"],
            })
            continue

        if tts_text != text:
            mapped = map_sentences_to_cues(words, tts_text, text, scene_from, fps)
            if mapped is None:
                print(f"    ⚠ sentence counts differ; falling back to spoken form")
                cues = group_words(words, scene_from, fps)
            else:
                cues = mapped
        else:
            cues = group_words(words, scene_from, fps)
        for c in cues:
            c["scene"] = sid
        out_cues.extend(cues)

    out_path = SUBTITLE_DIR / f"subtitles-{chapter}.json"
    out_path.write_text(
        json.dumps({"fps": fps, "cues": out_cues}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    diff_path = DIFF_DIR / f"asr-diff-{chapter}.txt"
    diff_path.write_text("\n".join(diff_lines), encoding="utf-8")
    print(f"  → {len(out_cues)} cues → {out_path.relative_to(ROOT)}")


def main(argv: list[str]) -> int:
    chapters = chapters_to_run(argv)
    if not chapters:
        print("No chapters specified.")
        return 1

    print(f"[info] device={DEVICE}")
    print("[info] loading whisper sanity model…")
    whisper_model = WhisperModel(WHISPER_MODEL, device=DEVICE, compute_type=COMPUTE_TYPE)
    print("[info] loading wav2vec2 alignment model for Korean…")
    align_model, align_meta = whisperx.load_align_model(language_code=ALIGN_LANG, device=DEVICE)

    for ch in chapters:
        align_chapter(ch, whisper_model, align_model, align_meta)
    print("Done.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
