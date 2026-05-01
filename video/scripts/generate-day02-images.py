"""Generate visual assets for the DAY02 VPC Networking video via Higgsfield API."""
from __future__ import annotations

import sys
import time
import urllib.request
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "images" / "day02"
OUT_DIR.mkdir(parents=True, exist_ok=True)

API_BASE = "http://localhost:8092/api/v1"
API_KEY = "hf_x2DMaqeoAeTWlDwMVrLPK-LnuA96SNsvB8JJ1-BD-mU"
HEADERS = {"X-API-Key": API_KEY, "Content-Type": "application/json"}

STYLE = (
    "Clean modern flat tech-blueprint illustration style, warm cream paper-textured background "
    "with subtle blueprint grid, friendly cartoon aesthetic. "
    "Palette: deep navy blue, electric cyan, soft sky blue, warm golden yellow accents, "
    "occasional coral red for warnings. Educational infographic energy, professional yet warm. "
    "Korean Pretendard-style typography. No logos other than what's specified. "
)

ASSETS = [
    {
        "id": "title",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "Big bold Korean title text 'VPC 네트워킹과 클라우드 인프라' top-center in deep navy. "
            "Subtitle below: '2일차 — 우리만의 안전한 네트워크 도시'. "
            "Visual: a stylized isometric cartoon city skyline made of cloud-shaped office buildings "
            "connected by glowing cyan network lines, with tiny network packet dots traveling along the lines. "
            "A cartoon Korean male consultant in navy suit on the right pointing toward the city. "
            "Sunrise gradient sky behind. YouTube thumbnail energy, professional and inviting."
        ),
    },
    {
        "id": "why_vpc",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "A 'before vs after' two-panel infographic on cream background. "
            "Left panel labeled '예전 EC2-Classic': cartoon shared office cubicle where 3 different "
            "company logos (A, B, C) are working in the same open space, with worried expressions and "
            "a magnifying glass showing 'others can peek!'. "
            "Right panel labeled 'VPC 시대': each company has its own walled-off private room with locked doors, "
            "all happy. Gradient arrow between them with text '격리 — 가상 사설 네트워크'. "
            "Top center bold Korean title 'VPC가 왜 필요한가' in deep navy."
        ),
    },
    {
        "id": "apartment",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "An isometric cute illustration of a Korean apartment complex. The whole complex labeled 'VPC 단지'. "
            "Two apartment buildings (동) labeled 'Subnet A' and 'Subnet B', each with several windows (호수). "
            "A clear front gate at the bottom labeled 'IGW 정문'. "
            "On one window a tiny doorlock icon labeled 'SG 도어락'. "
            "A security guard cartoon character at the gate. Dotted-line ground showing a road. "
            "Top center bold Korean title 'VPC = 아파트 단지' in deep navy. "
            "Friendly, warm pastel sky behind buildings."
        ),
    },
    {
        "id": "cidr",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "An infographic on cream background. Big centered text '10.0.0.0/16' in monospace Courier-style "
            "deep navy with a magnifying glass over it. "
            "Below, three horizontal cards comparing CIDR sizes: "
            "Card 1: '/16' large size with text '약 65,536개 IP — 큰 동네'; "
            "Card 2: '/20' medium size with text '약 4,096개 IP'; "
            "Card 3: '/24' small size with text '256개 IP — 좁은 동네'. "
            "Cards visually represent size by their relative width. Cyan gradient borders. "
            "Top center bold Korean title 'CIDR — IP 주소 범위 정하기' in deep navy."
        ),
    },
    {
        "id": "subnet_split",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "An isometric diagram on cream background. A large rectangle labeled 'VPC 10.0.0.0/16' "
            "subdivided into 4 smaller subnet rectangles arranged 2x2: "
            "Top-left labeled 'AZ-A Subnet 10.0.1.0/24' with cyan tint; "
            "Top-right labeled 'AZ-B Subnet 10.0.2.0/24' with cyan tint; "
            "Bottom-left 'AZ-A Subnet 10.0.10.0/24' with green tint; "
            "Bottom-right 'AZ-B Subnet 10.0.11.0/24' with green tint. "
            "AZ-A column has a building label, AZ-B column has another building label. "
            "Top center bold Korean title 'Multi-AZ 서브넷 분할' in deep navy. "
            "Below: small text '한 AZ 장애 → 다른 AZ가 살린다'."
        ),
    },
    {
        "id": "public_private",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "Split diagram on cream background. "
            "Left half (sky-blue tint) labeled 'Public Subnet 🌐': cartoon web server icon with antenna, "
            "directly connected to a cloud labeled 'Internet' via a glowing line. "
            "Right half (deep navy tint) labeled 'Private Subnet 🔒': cartoon database cylinder and app server icons "
            "behind a thick wall, NO direct line to Internet. "
            "A wall divider in the center labeled with a lock icon. "
            "Top center bold Korean title 'Public vs Private 서브넷 — 보안의 시작' in deep navy."
        ),
    },
    {
        "id": "routing",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "An infographic styled like road signs on cream background. "
            "Center: a large green road sign post with a Korean label '라우팅 테이블'. "
            "Left arrow on the post: '0.0.0.0/0 → IGW' with a small cloud icon (Public). "
            "Right arrow on the post: '0.0.0.0/0 → NAT' with a small lock icon (Private). "
            "Below the post a small cartoon Korean male consultant pointing at the sign with a friendly smile. "
            "Top center bold Korean title '라우팅 테이블 = 도로 표지판' in deep navy."
        ),
    },
    {
        "id": "igw",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "Isometric scene of a single big white archway gate labeled 'IGW' with a glowing cyan outline, "
            "between a cloud labeled 'Internet 🌐' on one side and a fenced-off green VPC area "
            "labeled 'VPC' on the other. A double-headed arrow through the gate. "
            "Three info badges floating: '✓ VPC당 1개', '✓ 자동 가용성', '✓ 무료'. "
            "Below: a small warning '⚠️ 라우팅 누락 시 인터넷 불가'. "
            "Top center bold Korean title 'Internet Gateway = 정문' in deep navy."
        ),
    },
    {
        "id": "nat",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "Isometric scene of a one-way swing door (in the shape of a turnstile) labeled 'NAT Gateway'. "
            "Left side: a private server icon with cyan circles; an arrow exits THROUGH the door labeled "
            "'아웃바운드 OK ✅' going right toward an Internet cloud. "
            "Right side: an arrow trying to come IN from internet, blocked by the door with a red X labeled '인바운드 ✕'. "
            "Below the door a small bill icon labeled '시간당 + 데이터 요금 — VPC 최고 비용 ⚠️'. "
            "Top center bold Korean title 'NAT Gateway — 단방향 인터넷 문' in deep navy."
        ),
    },
    {
        "id": "vpc_endpoint",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "Diagram comparing two paths on cream background. "
            "Top path (faded gray): VPC → NAT Gateway → Internet → S3 with text '비싼 길'. "
            "Bottom path (highlighted cyan): VPC → 'VPC Endpoint 🔒' (hidden tunnel icon) → S3 directly with "
            "text 'AWS 내부 망 — 무료'. "
            "S3 bucket icon and DynamoDB icon on the right. "
            "Top center bold Korean title 'VPC Endpoint — NAT 비용을 줄이는 비밀 통로' in deep navy. "
            "Money-saving sparkle effect on the bottom path."
        ),
    },
    {
        "id": "security_group",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "A friendly cartoon Korean security guard in a navy uniform with a clipboard, standing at the door of "
            "a single EC2 server icon. Above him a large speech bubble: 'Stateful — 들여보낸 손님은 자동 응답 OK'. "
            "Below him a list of 3 rules in green: 'Allow port 80', 'Allow port 443', 'Allow SSH from my IP'. "
            "And a single greyed-out 'Deny ✕' rule with a red strikethrough text 'Deny 규칙 없음'. "
            "Top center bold Korean title 'Security Group = 정문 경비원' in deep navy."
        ),
    },
    {
        "id": "nacl",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "A cartoon emergency barrier (red and white striped barrier arm) labeled 'NACL' across the entrance to a "
            "wide subnet area on cream background. The barrier has two separate signs: 'Inbound 100: Allow' and "
            "'Outbound 100: Deny IP 1.2.3.4'. "
            "Below in 2 badges: '🚫 Stateless — 인/아웃 따로', '✅ Deny 규칙 가능'. "
            "Comparison arrow pointing left to a small SG guard with text 'SG = 정문 경비원 (평상시)' "
            "and right to the barrier 'NACL = 비상 차단봉 (긴급시)'. "
            "Top center bold Korean title 'NACL — 서브넷 비상 차단봉' in deep navy."
        ),
    },
    {
        "id": "three_tier",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "Horizontal flow diagram on cream background showing 3-tier architecture. "
            "Far left: Internet cloud icon. Arrow → IGW gate → "
            "Box labeled 'Public Subnet': web server icon with shield 'sg-web' label. Arrow → "
            "Box labeled 'Private Subnet': app server icon with shield 'sg-app' label. Arrow → "
            "Box labeled 'Private Subnet': database cylinder icon with shield 'sg-db' label. "
            "Each shield is a distinct color (cyan, green, gold) and chained visually with small connector links. "
            "Top center bold Korean title '3-tier 아키텍처 — 보안 그룹 체인' in deep navy."
        ),
    },
    {
        "id": "sg_chain",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "A diagram on cream background. Left: a row of 5 web server icons all labeled 'sg-web' (with '...' "
            "indicating 100 servers total). Big arrow rightward. Right: a single app server icon labeled 'sg-app'. "
            "Above the arrow a code-style box: 'Source: sg-web ✅ (1 rule)'. "
            "Below in a comparison box: '❌ IP로 100줄 vs ✅ SG-to-SG 1줄'. "
            "A small thumbs-up icon and sparkles. "
            "Top center bold Korean title 'SG-to-SG 참조 — 100줄을 1줄로' in deep navy."
        ),
    },
    {
        "id": "trouble",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "An infographic on cream background. Top center bold Korean title '흔한 5가지 실수' in coral red. "
            "Three numbered cards in vertical stack, each with a warning icon and Korean text: "
            "Card 1 (red border): '① Public EC2 인터넷 안됨 → 라우팅 테이블 0.0.0.0/0 → IGW 빠짐'; "
            "Card 2 (orange border): '② NAT를 Private 서브넷에 생성 → Public 서브넷에 만들어야 함'; "
            "Card 3 (yellow border): '③ NACL 임시포트 누락 → 응답 트래픽 차단 (Stateless 함정)'. "
            "On the right a small cartoon Korean male consultant scratching his head with a question mark. "
            "Bottom: '이 셋만 피해도 절반은 안전 ✓'."
        ),
    },
    {
        "id": "five_lessons",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "Five numbered horizontal cards stacked vertically on cream background, each card with a different "
            "left-border accent color (navy, cyan, green, gold, coral). Each card has a small relevant icon: "
            "Card 1 (navy): 'VPC 아이콘 ① VPC는 클라우드의 기본 토대'; "
            "Card 2 (cyan): '🔒 ② Public/Private 분리가 보안의 시작'; "
            "Card 3 (green): '🏢 ③ Multi-AZ는 선택이 아닌 필수'; "
            "Card 4 (gold): '🛡️ ④ SG는 허용만, NACL은 거부도'; "
            "Card 5 (coral): '💰 ⑤ NAT 비용은 VPC Endpoint로'. "
            "Each card with a checkmark on the right. "
            "Top center bold large Korean title '2일차 핵심 5문장' in deep navy."
        ),
    },
    {
        "id": "outro",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "Friendly cartoon Korean male consultant standing on the left holding a glowing cloud icon, looking "
            "toward the right. To the right a roadmap dotted-line path leading from '오늘 2일차 — VPC' (small label) "
            "to a glowing destination labeled '내일 3일차 — EC2 + EBS' showing a server tower icon and a hard-disk icon. "
            "Above the path floating cloud icons and a glowing target marker. "
            "Top center bold Korean title '내일은 EC2 + EBS' in deep navy. "
            "Below: small warm text '단단한 네트워크 위에 서버를 올릴 시간'. "
            "Sunrise gradient background with cream and gold."
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
