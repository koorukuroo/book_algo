"""
Generate Korean narration audio per scene via ElevenLabs.

Usage:
  python scripts/generate-narration.py ch01
  python scripts/generate-narration.py ch01 ch02 ch03 ...
  python scripts/generate-narration.py --all
"""
from __future__ import annotations

import json
import os
import sys
import time
from pathlib import Path

from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from elevenlabs.core.api_error import ApiError

ROOT = Path(__file__).resolve().parents[1]
load_dotenv(ROOT.parent / ".env")

NARRATION_DIR = ROOT / "scripts" / "narrations"

api_key = os.getenv("ELEVENLABS_API_KEY")
if not api_key:
    raise SystemExit("ELEVENLABS_API_KEY not found in .env")


def chapters_to_run(argv: list[str]) -> list[str]:
    if not argv or "--all" in argv:
        return sorted(p.stem for p in NARRATION_DIR.glob("*.json"))
    return argv


def generate_chapter(client: ElevenLabs, chapter: str) -> None:
    script_path = NARRATION_DIR / f"{chapter}.json"
    if not script_path.exists():
        print(f"[skip] {chapter}: no script at {script_path.relative_to(ROOT)}")
        return
    data = json.loads(script_path.read_text(encoding="utf-8"))
    audio_dir = ROOT / "public" / "audio" / chapter
    audio_dir.mkdir(parents=True, exist_ok=True)

    voice_id = data["voice_id"]
    model_id = data["model_id"]

    print(f"[chapter] {chapter} ({len(data['scenes'])} scenes)")
    for scene in data["scenes"]:
        out = audio_dir / f"{scene['id']}.mp3"
        if out.exists() and out.stat().st_size > 0:
            print(f"  [skip] {out.name} ({out.stat().st_size} bytes)")
            continue
        # tts_text overrides text for the audio call (lets numerals stay as
        # digits in subtitles while the voice reads the spelled-out form).
        spoken = scene.get("tts_text") or scene["text"]
        print(f"  [tts]  {scene['id']}: {spoken[:50]}…")
        for attempt in range(6):
            try:
                audio_iter = client.text_to_speech.convert(
                    text=spoken,
                    voice_id=voice_id,
                    model_id=model_id,
                    output_format="mp3_44100_128",
                )
                with out.open("wb") as f:
                    for chunk in audio_iter:
                        f.write(chunk)
                break
            except ApiError as exc:
                if exc.status_code == 429 and attempt < 5:
                    wait = 4 * (2 ** attempt)
                    print(f"         429 rate-limited; sleeping {wait}s")
                    time.sleep(wait)
                    continue
                raise
        print(f"         → {out.name} ({out.stat().st_size} bytes)")


def main(argv: list[str]) -> int:
    chapters = chapters_to_run(argv)
    if not chapters:
        print("No chapters specified. Use --all or pass chapter ids (ch01 ch02 …).")
        return 1
    client = ElevenLabs(api_key=api_key)
    for ch in chapters:
        generate_chapter(client, ch)
    print("Done.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
