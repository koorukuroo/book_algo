"""
Re-time each narration JSON's `from`/`duration` to match the actual MP3 lengths
(measured via ffprobe). Adds a small tail buffer per scene.

Usage: python scripts/sync-durations.py [chapter ...]   (or --all)
"""
from __future__ import annotations

import json
import math
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NARRATION_DIR = ROOT / "scripts" / "narrations"
AUDIO_ROOT = ROOT / "public" / "audio"

TAIL_BUFFER_FRAMES = 30  # ~1s breathing room after each scene


def ffprobe_duration(path: Path) -> float:
    out = subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=nw=1:nk=1", str(path),
    ])
    return float(out.strip())


def sync(chapter: str) -> None:
    script_path = NARRATION_DIR / f"{chapter}.json"
    if not script_path.exists():
        print(f"[skip] no script for {chapter}")
        return
    config = json.loads(script_path.read_text(encoding="utf-8"))
    fps = config["fps"]
    audio_dir = AUDIO_ROOT / chapter
    cursor = 0
    for scene in config["scenes"]:
        audio_path = audio_dir / f"{scene['id']}.mp3"
        if not audio_path.exists():
            print(f"  [warn] missing {audio_path.relative_to(ROOT)}")
            continue
        dur_s = ffprobe_duration(audio_path)
        scene_frames = math.ceil(dur_s * fps) + TAIL_BUFFER_FRAMES
        # Round up to nearest 30 frames (1 second) for cleaner timeline values
        scene_frames = math.ceil(scene_frames / 30) * 30
        scene["from"] = cursor
        scene["duration"] = scene_frames
        cursor += scene_frames
    script_path.write_text(
        json.dumps(config, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"[ok] {chapter}: total {cursor} frames ({cursor / fps:.1f}s)")


def main(argv: list[str]) -> int:
    if not argv or "--all" in argv:
        chapters = sorted(p.stem for p in NARRATION_DIR.glob("*.json"))
    else:
        chapters = argv
    for ch in chapters:
        sync(ch)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
