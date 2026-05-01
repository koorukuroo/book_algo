"""Generate visual assets for the DAY03 High-Availability Web Architecture video."""
from __future__ import annotations

import sys
import time
import urllib.request
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "images" / "day03"
OUT_DIR.mkdir(parents=True, exist_ok=True)

API_BASE = "http://localhost:8092/api/v1"
API_KEY = "hf_x2DMaqeoAeTWlDwMVrLPK-LnuA96SNsvB8JJ1-BD-mU"
HEADERS = {"X-API-Key": API_KEY, "Content-Type": "application/json"}

STYLE = (
    "Clean modern flat tech-blueprint illustration, warm cream paper-textured background, "
    "friendly cartoon aesthetic. Palette: deep navy, electric cyan, soft sky blue, golden yellow, "
    "occasional coral red for warnings. Educational infographic energy. "
    "Korean Pretendard-style typography. "
)

ASSETS = [
    {
        "id": "title",
        "prompt": (
            f"{STYLE}"
            "Big bold Korean title 'AWS 고가용 웹서비스 아키텍처' top center in deep navy. "
            "Subtitle: '3일차 — ALB + Auto Scaling으로 트래픽 폭증 대응'. "
            "Visual: a grand modern data center with multiple cartoon servers in cyan glow on a circular base, "
            "an ALB icon at top distributing arrows to multiple servers below, "
            "Korean male consultant in navy suit pointing at the system with confidence. "
            "Sunrise gradient sky behind. YouTube thumbnail energy."
        ),
    },
    {
        "id": "blackfriday",
        "prompt": (
            f"{STYLE}"
            "A dramatic before/after comparison on cream background. "
            "Left panel: a single small overheated cartoon server, smoke rising, error icon, "
            "labeled '서버 1대' with red 'DOWN' overlay, surrounded by frustrated user faces. "
            "Right side: big bold Korean title '블랙프라이데이의 비극' in coral red. "
            "Floating numbers: '50배 트래픽', '30분 다운', '12억 손실', '이탈 30%'. "
            "Background: faded shopping cart icons and stock-chart line going down."
        ),
    },
    {
        "id": "alb_concept",
        "prompt": (
            f"{STYLE}"
            "A cartoon mart scene with a friendly Korean female cashier guide pointing customers to checkout lanes. "
            "Three cartoon checkout counters labeled 'EC2 #1', 'EC2 #2', 'EC2 #3', "
            "with Korean customers being directed to less-busy ones. "
            "Above: bold Korean title 'ALB = 마트 계산대 안내원' in deep navy. "
            "On the left a small label '요청' with arrows fanning out. "
            "Cream background, friendly atmosphere."
        ),
    },
    {
        "id": "nlb_vs_alb",
        "prompt": (
            f"{STYLE}"
            "Side-by-side comparison on cream background. "
            "Left card (cyan border): big 'NLB' label, '🚀 L4 — TCP/UDP', '초고속 처리', "
            "small icon of a fast bullet train. "
            "Right card (navy border): big 'ALB' label, '🧠 L7 — HTTP/HTTPS', '콘텐츠 기반 라우팅', "
            "small icon of a brain with arrows. "
            "Top center bold Korean title 'NLB vs ALB — 4계층 vs 7계층' in deep navy. "
            "Bottom: small text '웹 99% = ALB로 시작'."
        ),
    },
    {
        "id": "alb_parts",
        "prompt": (
            f"{STYLE}"
            "Four large numbered cards in 2x2 grid on cream background. Each card has an icon and Korean label: "
            "Card 1 (cyan): '① Listener — 외부 요청 수신' with antenna icon; "
            "Card 2 (navy): '② Target Group — 서버 묶음' with grouped servers icon; "
            "Card 3 (gold): '③ Routing Rules — 갈림길 결정' with branching arrow icon; "
            "Card 4 (green): '④ Health Check — 살아있는 서버만' with heartbeat icon. "
            "Top center bold Korean title 'ALB 핵심 4부품' in deep navy."
        ),
    },
    {
        "id": "health_check",
        "prompt": (
            f"{STYLE}"
            "An infographic showing ALB and three EC2 servers connected by lines. "
            "ALB on left labeled with stethoscope icon. Three servers stacked on right: "
            "Server 1 with green ❤️ '200 OK Healthy'; "
            "Server 2 with green ❤️ '200 OK Healthy'; "
            "Server 3 with red ❌ '연속 실패 → 격리'. "
            "An arrow from ALB to server 3 with a red 'X' blocking it. "
            "Top center bold Korean title 'Health Check — 살아있는 서버만 격리' in deep navy. "
            "Bottom: small text '30초마다 /health 호출'."
        ),
    },
    {
        "id": "asg_concept",
        "prompt": (
            f"{STYLE}"
            "A cartoon scene of taxi dispatch center. A large central dispatcher screen labeled 'ASG 자동 배차'. "
            "Left side: a busy crowd of customers with arrows '↑ 트래픽 폭증 → 택시 호출'. "
            "Right side: 5 taxis emerging in sequence with animation lines. "
            "Above: bold Korean title 'ASG = 자동 택시 배차 시스템' in deep navy. "
            "Below right: a small sleeping cartoon ops engineer with text '새벽 3시에도 안 깨도 OK'."
        ),
    },
    {
        "id": "launch_template",
        "prompt": (
            f"{STYLE}"
            "An isometric blueprint sheet on a desk, labeled 'Launch Template 설계도' at top in deep navy. "
            "On the blueprint: 4 labeled boxes — 'AMI 이미지', 'Instance Type', 'Security Group', 'User Data Script'. "
            "An arrow from the blueprint to the right showing 5 identical cartoon servers being stamped out, "
            "labeled '동일 서버 무한 복제'. "
            "Cream background with subtle grid pattern."
        ),
    },
    {
        "id": "min_max_desired",
        "prompt": (
            f"{STYLE}"
            "A horizontal range slider/gauge style infographic on cream background. "
            "Three vertical markers on a horizontal axis: "
            "Left marker (cyan, small): 'Min = 2 — 최소 보장'; "
            "Center marker (gold, glowing): 'Desired = 4 — 현재 목표 (자동 조정)'; "
            "Right marker (coral, large): 'Max = 10 — 안전 한도'. "
            "Below: 4 cartoon servers stacked horizontally with dotted future ones from 5 to 10. "
            "Top center bold Korean title 'Min / Max / Desired — ASG 3숫자' in deep navy."
        ),
    },
    {
        "id": "target_tracking",
        "prompt": (
            f"{STYLE}"
            "A cartoon air conditioner remote control on left labeled 'Target Tracking', "
            "displaying '50%' on its screen. Arrows from remote pointing right to a row of cartoon servers. "
            "Three servers normally lit, two more being added with sparkle '+' marks. "
            "Above: bold Korean title 'Target Tracking = 에어컨 온도 설정' in deep navy. "
            "Below: small text 'CPU 50% 유지 → AWS가 알아서 조정 ✨'. "
            "Friendly, simple, clear."
        ),
    },
    {
        "id": "step_scheduled",
        "prompt": (
            f"{STYLE}"
            "Two-panel comparison on cream background. "
            "Left panel (cyan border): 'Step Scaling' with stair-step graph going up: "
            "'CPU 70% → +2대', 'CPU 90% → +5대'. Small staircase icon. "
            "Right panel (gold border): 'Scheduled Scaling' with clock icon and weekly calendar: "
            "'매일 18:00 → 5대 → 10대'. Small alarm clock icon. "
            "Top center bold Korean title '나머지 두 정책 — 계단식 / 시간 예약' in deep navy. "
            "Bottom: small text '예측 가능한 트래픽엔 Scheduled가 정답'."
        ),
    },
    {
        "id": "multi_az_ha",
        "prompt": (
            f"{STYLE}"
            "An isometric architecture diagram on cream background. Top: a cloud icon labeled 'Internet'. "
            "Center: an ALB icon spanning two zones. Bottom split into two columns: "
            "Left column labeled 'AZ-A' with 2 cartoon servers in cyan; "
            "Right column labeled 'AZ-B' with 2 cartoon servers in green. "
            "On the left zone a 'X DOWN' overlay on its servers showing failure scenario, "
            "but right zone still glowing brightly with 'OK' badge. "
            "Top center bold Korean title 'Multi-AZ — 한 AZ 죽어도 살아있음' in deep navy. "
            "Below: '99.99% = 연 52분만 다운'."
        ),
    },
    {
        "id": "alb_sg_security",
        "prompt": (
            f"{STYLE}"
            "Two-scenario comparison on cream background. "
            "Top scenario (red, faded): EC2 boxes labeled 'EC2' with red SG '0.0.0.0/0' open everywhere. "
            "An attacker icon directly accessing them with bypass arrow, big red 'X 위험'. "
            "Bottom scenario (green, highlighted): ALB on left with cyan SG, EC2 boxes on right with SG that says 'Source: sg-alb only'. "
            "Attacker icon trying direct access blocked by a wall '✓ 차단'. "
            "Top center bold Korean title 'EC2 SG = ALB SG만 허용' in deep navy."
        ),
    },
    {
        "id": "trouble",
        "prompt": (
            "Korean educational infographic, cream paper background. "
            "Top center bold red title '흔한 3가지 함정'. "
            "Three numbered cards stacked vertically with warning icons: "
            "Card 1 (red border): '① Health Check 경로 / → 401 → 전체 죽음'; "
            "Card 2 (orange border): '② Scale In 너무 빠름 → 응답 끊김'; "
            "Card 3 (yellow border): '③ EC2 SG 0.0.0.0/0 → 우회 가능'. "
            "Cartoon worried Korean male consultant on right with question mark. "
            "Bottom: '이 셋만 피해도 절반 안전 ✓'."
        ),
    },
    {
        "id": "five_lessons",
        "prompt": (
            "Korean educational infographic, cream paper background. "
            "Top center bold large title '3일차 핵심 5문장' in deep navy. "
            "Five numbered horizontal cards stacked with checkmarks and accent border colors: "
            "'① 단일 서버는 곧 단일 장애점'; "
            "'② ALB는 분산, ASG는 확장 = 고가용성'; "
            "'③ 정책은 Target Tracking부터'; "
            "'④ Scale Out은 빠르게, Scale In은 느리게'; "
            "'⑤ Multi-AZ가 99.99% 비결'."
        ),
    },
    {
        "id": "outro",
        "prompt": (
            f"{STYLE}"
            "Friendly cartoon Korean male consultant on left holding a glowing server icon. "
            "To his right a roadmap path leading from '오늘 3일차 — ALB+ASG' (small label) to a glowing destination "
            "labeled '내일 4일차 — EC2 + EBS' showing a CPU chip and SSD disk icon. "
            "Above the path floating cloud icons. "
            "Top center bold Korean title '내일은 EC2 + EBS' in deep navy. "
            "Below: small warm text '서버 한 대 한 대를 깊이 있게'. "
            "Sunrise gradient background."
        ),
    },
]


def submit(asset: dict) -> str:
    payload = {
        "aspect_ratio": "16:9",
        "model": "nano_banana_pro",
        "prompt": asset["prompt"],
        "resolution": "2k",
        "unlimited": False,
    }
    r = requests.post(f"{API_BASE}/generate", headers=HEADERS, json=payload, timeout=60)
    r.raise_for_status()
    data = r.json()
    if not data.get("success"):
        raise RuntimeError(f"submit failed: {data}")
    return data["item_id"]


def poll(item_id: str, timeout: int = 900) -> str:
    start = time.time()
    while True:
        r = requests.get(f"{API_BASE}/generate/{item_id}", headers=HEADERS, timeout=60)
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
