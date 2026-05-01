"""Generate visual assets for the Solo7 video via Higgsfield API."""
from __future__ import annotations

import sys
import time
import urllib.request
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "images" / "solo7"
OUT_DIR.mkdir(parents=True, exist_ok=True)

API_BASE = "http://localhost:8092/api/v1"
API_KEY = "hf_x2DMaqeoAeTWlDwMVrLPK-LnuA96SNsvB8JJ1-BD-mU"
HEADERS = {"X-API-Key": API_KEY, "Content-Type": "application/json"}

STYLE = (
    "Clean modern flat illustration style, warm cream paper-textured background, "
    "high contrast friendly cartoon characters with K-drama dating-show aesthetic, "
    "soft pastel palette with vivid coral pink and warm yellow accents, "
    "no logos, no extra captions other than the specified Korean text. "
)

ASSETS = [
    {
        "id": "title-cover",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "Centered massive bold Korean title text '나는 솔로의 수학' in deep coral pink, "
            "subtitle below: '7명 중 누구를 고를까?'. "
            "Visual: a stylized TV-show stage with 7 spotlit silhouette figures in a row "
            "on a circular pink stage, hearts and math symbols (∑, ÷, ≈) floating playfully above, "
            "a single golden spotlight beam from upper-right. YouTube thumbnail energy, very click-worthy."
        ),
    },
    {
        "id": "candidates-row",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "Horizontal row of 7 cute simple cartoon female-only character bust illustrations "
            "facing camera with warm friendly smiles. Each woman is in a slightly different "
            "colored pastel circle frame (pink, yellow, mint, sky, lavender, peach, cream), "
            "labeled 1 to 7 below each. Diverse hairstyles: long straight, ponytail, glasses, "
            "short bob, curly, braids, bun. All clearly female, no men in this image. "
            "Cream textured background. Top center small text label '솔로 7인'. "
            "Friendly, warm, K-drama dating-show energy, no clutter."
        ),
    },
    {
        "id": "trap",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "Left side: a cartoon character with hearts in their eyes pointing decisively at "
            "candidate #2 in a row of 7 cards (cards 3 to 7 are dimmed/grayed out, "
            "with question marks on them). Big red 'X' overlay over the choice. "
            "Right side: bold Korean text '비교 대상이 없는 선택' in coral red. "
            "Cream background. A small thought-bubble showing a sad regretful face."
        ),
    },
    {
        "id": "algorithm",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "Row of 7 cute female cartoon character cards horizontally, all women with different hairstyles. "
            "Cards 1 and 2 are dimmed/grayed with translucent '관찰만' tags. "
            "A yellow dashed vertical line between card 2 and card 3. "
            "Card 4 is highlighted with a big glowing pink heart above it, sparkles, "
            "and a bold '결단' badge. Cards 3, 5, 6, 7 are colorful but plainer. "
            "Top text: '37% 법칙: 처음 2명은 관찰'. "
            "Bottom text: '4번째에게 결단!'."
        ),
    },
    {
        "id": "mutual-axis",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "A 2D scatter plot graph on cream paper. X-axis labeled '호감도 (내 마음)', "
            "Y-axis labeled '상호성 (상대 마음)'. Three labeled cute character heads plotted: "
            "'A — 95점/10%' in upper-left corner with a fading heart (high crush, low chance), "
            "'B — 82점/70%' near top-right (sweet spot), highlighted with a star burst, "
            "'C — 70점/95%' on right side. Dotted curve through them. "
            "Title above: '호감도 × 상호성'. Coral, mint, and yellow palette."
        ),
    },
    {
        "id": "override",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "A balance scale at center. Left pan: a brain with gears, equations, and percentage "
            "signs floating around it ('확률 계산'). Right pan: a glowing pink heart with sparkles "
            "('내 마음'). The right side (heart) tips slightly down — heart wins. "
            "Above: bold Korean text '인간 오버라이드' in warm gold. "
            "Below: smaller text '내가 나답게 있을 수 있는가'. Cream background, soft glow."
        ),
    },
    {
        "id": "outro-summary",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "Four playfully designed numbered cards in a 2x2 grid on cream background, each card "
            "with a different pastel border color (coral, yellow, mint, lavender). "
            "Card 1 reads '① 처음 2명은 관찰', Card 2 '② 3번째부터 결단', "
            "Card 3 '③ 호감도 × 상호성', Card 4 '④ 마지막엔 내 마음'. "
            "Top center bold Korean title '나는 솔로 알고리즘 4단계'. "
            "Tiny hearts and stars scattered between cards. Clean, organized, infographic style."
        ),
    },
]


def submit(asset: dict) -> str:
    payload = {
        "aspect_ratio": asset.get("ratio", "16:9"),
        "model": "nano_banana_pro",
        "prompt": asset["prompt"],
        "resolution": "2k",
        "unlimited": False,
    }
    r = requests.post(f"{API_BASE}/generate", headers=HEADERS, json=payload, timeout=30)
    r.raise_for_status()
    data = r.json()
    if not data.get("success"):
        raise RuntimeError(f"submit failed: {data}")
    return data["item_id"]


def poll(item_id: str, timeout: int = 600) -> str:
    start = time.time()
    while True:
        r = requests.get(f"{API_BASE}/generate/{item_id}", headers=HEADERS, timeout=30)
        r.raise_for_status()
        data = r.json()
        st = data.get("status")
        if st == "completed":
            return data["result_image_url"]
        if st == "failed":
            raise RuntimeError(f"failed: {data.get('error_message')}")
        if time.time() - start > timeout:
            raise TimeoutError(item_id)
        time.sleep(5)


def download(url: str, out: Path) -> None:
    if not url.startswith(("http://", "https://")):
        url = f"http://localhost:8092{url}"
    urllib.request.urlretrieve(url, out)


def main(only: list[str] | None = None) -> int:
    targets = [a for a in ASSETS if not only or a["id"] in only]
    submitted: list[tuple[dict, str]] = []
    for a in targets:
        out = OUT_DIR / f"{a['id']}.jpg"
        if out.exists() and out.stat().st_size > 10000:
            print(f"  [skip]   {a['id']}")
            continue
        try:
            item_id = submit(a)
            print(f"  [submit] {a['id']} → {item_id}")
            submitted.append((a, item_id))
        except Exception as exc:
            print(f"  [error]  submit {a['id']}: {exc}")
    for a, item_id in submitted:
        out = OUT_DIR / f"{a['id']}.jpg"
        try:
            url = poll(item_id)
            download(url, out)
            print(f"  [ok]     {a['id']} ({out.stat().st_size} bytes)")
        except Exception as exc:
            print(f"  [error]  {a['id']}: {exc}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:] if len(sys.argv) > 1 else None))
