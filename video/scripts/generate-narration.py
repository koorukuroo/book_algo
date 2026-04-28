"""
Generate Korean narration audio per scene via ElevenLabs.

Usage:  uv run --with elevenlabs --with python-dotenv python scripts/generate-narration.py
        (or)  pip install elevenlabs python-dotenv && python scripts/generate-narration.py
"""
from __future__ import annotations
import json
import os
from pathlib import Path
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs

ROOT = Path(__file__).resolve().parents[1]
load_dotenv(ROOT.parent / ".env")  # /Users/kyunghoon/project/project2026/book/.env

api_key = os.getenv("ELEVENLABS_API_KEY")
if not api_key:
    raise SystemExit("ELEVENLABS_API_KEY not found in .env")

client = ElevenLabs(api_key=api_key)

script_path = ROOT / "scripts" / "narration-script.json"
data = json.loads(script_path.read_text(encoding="utf-8"))

audio_dir = ROOT / "public" / "audio"
audio_dir.mkdir(parents=True, exist_ok=True)

voice_id = data["voice_id"]
model_id = data["model_id"]

for scene in data["scenes"]:
    out = audio_dir / f"{scene['id']}.mp3"
    if out.exists() and out.stat().st_size > 0:
        print(f"[skip] {out.name} already exists ({out.stat().st_size} bytes)")
        continue
    print(f"[generate] {scene['id']}: {scene['text'][:60]}...")
    audio_iter = client.text_to_speech.convert(
        text=scene["text"],
        voice_id=voice_id,
        model_id=model_id,
        output_format="mp3_44100_128",
    )
    with out.open("wb") as f:
        for chunk in audio_iter:
            f.write(chunk)
    print(f"          → {out.name} ({out.stat().st_size} bytes)")

print("All narration generated.")
