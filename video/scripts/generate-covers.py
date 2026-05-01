"""
Generate YouTube cover thumbnails for each chapter via Higgsfield localhost API.
Submits all 12, polls until each completes, downloads to public/images/covers/.
"""
from __future__ import annotations

import json
import sys
import time
import urllib.request
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "images" / "covers"
OUT_DIR.mkdir(parents=True, exist_ok=True)

API_BASE = "http://localhost:8092/api/v1"
API_KEY = "hf_x2DMaqeoAeTWlDwMVrLPK-LnuA96SNsvB8JJ1-BD-mU"
HEADERS = {"X-API-Key": API_KEY, "Content-Type": "application/json"}

STYLE_BASE = (
    "YouTube thumbnail design, 16:9 aspect ratio, ultra eye-catching click-worthy. "
    "Modern flat illustration style with a hint of paper-textured warmth. "
    "Cream beige paper-like background with subtle texture. "
    "Bold large Korean display typography, very high contrast, friendly book series aesthetic. "
    "Single strong focal subject, clean composition, professional educational content cover. "
    "No watermarks, no logos, no captions other than the specified Korean text."
)

COVERS = [
    {
        "id": "ch01",
        "title": "최적 멈춤",
        "prompt": (
            f"{STYLE_BASE} "
            "Centered massive bold Korean text '37%' in bright vivid orange, the percent sign smaller. "
            "Below in smaller display Korean text: '최적 멈춤'. "
            "On the left, a silhouette of a young person in a cardigan standing at a fork in a winding road at golden hour, "
            "looking ahead, multiple paths spreading into the distance. Soft warm sun glow. "
            "Cream textured background. Subtle dotted compass rose decoration in corner."
        ),
    },
    {
        "id": "ch02",
        "title": "탐색과 활용",
        "prompt": (
            f"{STYLE_BASE} "
            "Top-center bold Korean display text '탐색 vs 활용' in dark navy, 'vs' in mint color. "
            "Below in smaller text: '최신 vs 최고'. "
            "Two side-by-side cute illustrated restaurants: left a familiar Korean noodle shop with a heart icon (활용), "
            "right a colorful new Thai restaurant with sparkles (탐색). A small silhouette person stands between them holding a question mark. "
            "Warm cream background. Mint and coral accent colors."
        ),
    },
    {
        "id": "ch03",
        "title": "정렬",
        "prompt": (
            f"{STYLE_BASE} "
            "Top center massive bold Korean text '정렬' in deep sky blue. "
            "Below smaller text: 'O(n log n)'. "
            "Visual: a stack of colorful books gracefully cascading and self-sorting from messy to perfectly aligned, like a domino animation. "
            "A pair of socks on the side comically mismatched. Cream background, sky blue and yellow palette. "
            "Subtle gridlines beneath."
        ),
    },
    {
        "id": "ch04",
        "title": "캐싱",
        "prompt": (
            f"{STYLE_BASE} "
            "Top-left bold Korean display text '잊어버려도 괜찮아' in warm amber. "
            "Below in smaller text: '캐싱'. "
            "Visual: a charming illustrated wooden wardrobe cross-section showing four most-used clothes neatly hung in front (shirt, pants, jacket, sneakers), "
            "and a basement-style storage box below labeled '오래된 옷' with dim lighting. A clock in the upper-right shows time passing. "
            "Cream background, sun yellow and warm browns palette."
        ),
    },
    {
        "id": "ch05",
        "title": "스케줄링",
        "prompt": (
            f"{STYLE_BASE} "
            "Top center bold Korean display text '무엇을 먼저 할까' in deep plum purple. "
            "Below smaller text: '스케줄링'. "
            "Visual: a stylized to-do list pinned to a corkboard with five colorful sticky notes in priority order, each with a clock icon. "
            "An hourglass on the side. A coffee cup. Cream background, plum and warm orange palette. "
            "A subtle red 'urgent' stamp on one note."
        ),
    },
    {
        "id": "ch06",
        "title": "베이즈 규칙",
        "prompt": (
            f"{STYLE_BASE} "
            "Top-right bold Korean display text '작은 정보로 큰 예측을' in deep sky blue. "
            "Below smaller text: '베이즈 규칙'. "
            "Visual: a charming illustrated crystal ball showing a question mark turning into 'X 시간 → X 더', "
            "with a stylized Berlin Wall fragment to the side and a small graph curve hovering above. "
            "Cream background, sky blue and silver palette. Magic sparkles around the crystal ball."
        ),
    },
    {
        "id": "ch07",
        "title": "과적합",
        "prompt": (
            f"{STYLE_BASE} "
            "Top center bold Korean display text '너무 잘 맞히면' in vivid coral red, with '잘' in deeper red. "
            "Below smaller text: '과적합'. "
            "Visual: a chart with 8 dots (data points) and two curves overlaid: a straight clean line (good model) and a wildly oscillating purple curve (overfit). "
            "A smiling thumbs-up next to the line, an X mark next to the wiggly curve. "
            "Cream background, red and mint accents. Graph paper background with subtle grid."
        ),
    },
    {
        "id": "ch08",
        "title": "완화",
        "prompt": (
            f"{STYLE_BASE} "
            "Top-left bold Korean display text '풀 수 없는 문제를' on top, '푸는 법' below in deep plum. "
            "Visual: a stylized illustrated maze with a glowing dotted line cutting through it as a shortcut, and a knapsack icon to the right. "
            "Small connected city pins like a traveling salesman map below. "
            "Cream background, plum purple and emerald green palette. A lightbulb icon shining."
        ),
    },
    {
        "id": "ch09",
        "title": "무작위",
        "prompt": (
            f"{STYLE_BASE} "
            "Top center bold Korean display text '우연이 만드는 답' in deep mint teal. "
            "Below smaller text: '무작위'. "
            "Visual: a circle inside a square filled with random colorful dots (Monte Carlo π estimation visualization). "
            "Two playful dice in the corner. A 'π' symbol prominent on one side. "
            "Cream background, mint and pink palette. Confetti-like dots scattered."
        ),
    },
    {
        "id": "ch10",
        "title": "네트워킹",
        "prompt": (
            f"{STYLE_BASE} "
            "Top-right bold Korean display text '함께 일하는 법' in deep sky blue. "
            "Below smaller text: '네트워킹'. "
            "Visual: a clean network diagram of five colorful nodes connected by lines with small data packets as glowing dots traveling along them. "
            "A retry icon (circular arrow with '×2 ×4 ×8') showing exponential backoff. "
            "Cream background, sky blue and electric cyan palette. Subtle radio waves emanating."
        ),
    },
    {
        "id": "ch11",
        "title": "게임 이론",
        "prompt": (
            f"{STYLE_BASE} "
            "Top center bold Korean display text '합리성의 한계' in vivid coral red. "
            "Below smaller text: '게임 이론'. "
            "Visual: a 2x2 game-theory matrix table with happy/sad face emojis in cells (prisoner's dilemma), "
            "and two cute cartoon characters facing each other thinking with thought bubbles containing question marks. "
            "A tiny gavel/auction hammer icon in the corner. "
            "Cream background, red and royal blue palette."
        ),
    },
    {
        "id": "conclusion",
        "title": "계산적 친절",
        "prompt": (
            f"{STYLE_BASE} "
            "Centered bold Korean display text '계산적 친절' in warm mint teal, with a sparkle accent above. "
            "Below smaller text: '결론'. "
            "Visual: two friendly cartoon characters: one offering a menu card with two options 'A or B' to the other who smiles relieved. "
            "Soft warm light around them. A small heart symbol between them. Books and a coffee cup beside. "
            "Cream background, mint and warm pastel palette. Gentle radial glow."
        ),
    },
]


def submit(cover: dict) -> str:
    payload = {
        "aspect_ratio": "16:9",
        "model": "nano_banana_pro",
        "prompt": cover["prompt"],
        "resolution": "2k",
        "unlimited": False,
    }
    r = requests.post(f"{API_BASE}/generate", headers=HEADERS, json=payload, timeout=30)
    r.raise_for_status()
    data = r.json()
    if not data.get("success"):
        raise RuntimeError(f"Submit failed for {cover['id']}: {data}")
    return data["item_id"]


def poll(item_id: str, timeout: int = 600) -> str:
    start = time.time()
    while True:
        r = requests.get(f"{API_BASE}/generate/{item_id}", headers=HEADERS, timeout=30)
        r.raise_for_status()
        data = r.json()
        status = data.get("status")
        if status == "completed":
            url = data.get("result_image_url")
            if not url:
                raise RuntimeError(f"completed but no url: {data}")
            return url
        if status == "failed":
            raise RuntimeError(f"generation failed: {data.get('error_message')}")
        if time.time() - start > timeout:
            raise TimeoutError(f"polling timeout for {item_id}")
        time.sleep(5)


def download(url: str, out_path: Path) -> None:
    if not url.startswith(("http://", "https://")):
        # API may return a relative path
        url = f"http://localhost:8092{url}"
    urllib.request.urlretrieve(url, out_path)


def main(only: list[str] | None = None) -> int:
    targets = [c for c in COVERS if not only or c["id"] in only]
    print(f"[info] {len(targets)} covers to generate → {OUT_DIR.relative_to(ROOT)}")

    # Submit all in sequence (API queues them)
    submitted: list[tuple[dict, str]] = []
    for cover in targets:
        out_path = OUT_DIR / f"{cover['id']}.jpg"
        if out_path.exists() and out_path.stat().st_size > 10000:
            print(f"  [skip] {cover['id']} already exists ({out_path.stat().st_size} bytes)")
            continue
        try:
            item_id = submit(cover)
            print(f"  [submit] {cover['id']} → {item_id}")
            submitted.append((cover, item_id))
        except Exception as exc:
            print(f"  [error] submit {cover['id']}: {exc}")

    # Poll and download
    for cover, item_id in submitted:
        out_path = OUT_DIR / f"{cover['id']}.jpg"
        try:
            print(f"  [wait]  {cover['id']} ({item_id})…", flush=True)
            url = poll(item_id)
            download(url, out_path)
            size = out_path.stat().st_size
            print(f"  [ok]    {cover['id']} ({size} bytes) ← {url}")
        except Exception as exc:
            print(f"  [error] {cover['id']}: {exc}")

    print("[done]")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:] if len(sys.argv) > 1 else None))
