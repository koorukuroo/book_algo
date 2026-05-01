"""Generate visual assets for the DAY04 EC2 Infrastructure video."""
from __future__ import annotations

import sys
import time
import urllib.request
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "images" / "day04"
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
            "Big bold Korean title 'EC2 기반 인프라 구축' top center in deep navy. "
            "Subtitle: '4일차 — 가상 서버 한 대를 직접 만들어보다'. "
            "Visual: a stylized cartoon EC2 server tower with glowing cyan circuit lines, surrounded by "
            "smaller orbiting icons (CPU chip, SSD disk, key icon, network gear), "
            "Korean male consultant in navy suit on right giving thumbs up. "
            "Sunrise gradient sky behind. YouTube thumbnail energy."
        ),
    },
    {
        "id": "hook",
        "prompt": (
            f"{STYLE}"
            "Two-panel before/after on cream background. "
            "Left panel: a tired Korean male IT engineer staring at a calendar marked '6주 = 42일' with "
            "boxes labeled '발주 → 배송 → 설치 → OS 셋업', a giant physical server box at his feet. "
            "Right panel: same engineer smiling, clicking a button, a virtual server appearing with sparkles "
            "labeled '1분 만에 OK!', floating cloud icons. "
            "Top center bold Korean title '2006년 EC2 — 6주가 1분으로' in deep navy. "
            "Bottom: small text '클라우드 시대의 시작'."
        ),
    },
    {
        "id": "ec2_rental",
        "prompt": (
            f"{STYLE}"
            "A friendly cartoon retail shop scene with bold Korean signage 'EC2 컴퓨터 렌탈샵' on a storefront. "
            "Inside: shelves of various computer specs from small laptop to large workstation, "
            "Korean female customer pointing at one, smiling Korean male shopkeeper showing a price tag '시간당 $0.01'. "
            "A clock icon showing 'time-based billing'. Top center bold Korean title 'EC2 = 컴퓨터 렌탈샵' in deep navy. "
            "Cream textured background with subtle dotted patterns."
        ),
    },
    {
        "id": "ami",
        "prompt": (
            f"{STYLE}"
            "Diagram showing one AMI image disk on left labeled 'AMI 디스크 이미지', "
            "with a big arrow rightward replicating into 4 identical cartoon servers, "
            "all labeled with checkmarks 'Nginx ✓ App ✓ Config ✓'. "
            "Each server has identical software icons inside. "
            "Top center bold Korean title 'AMI = OS 이미지로 무한 복제' in deep navy. "
            "Below: small text '같은 AMI = 완전히 똑같은 서버'. Cream background."
        ),
    },
    {
        "id": "instance_type",
        "prompt": (
            f"{STYLE}"
            "An infographic decoding 't3.micro' on cream background. "
            "Big monospace text 't3.micro' centered, broken down with three big colored arrows: "
            "'t' arrow pointing to 'T 패밀리 — 가벼운 일반' card with feather icon; "
            "'3' arrow pointing to '세대 (3세대)' card; "
            "'micro' arrow pointing to '크기 (작은)' card. "
            "Below: 4 family icons in row labeled 'T (가벼운)', 'M (균형)', 'C (CPU 집약)', 'R (메모리 집약)'. "
            "Top center bold Korean title '인스턴스 타입 이름 해독' in deep navy."
        ),
    },
    {
        "id": "ebs_vs_store",
        "prompt": (
            f"{STYLE}"
            "Side-by-side comparison on cream background. "
            "Left card (green border): a cartoon EC2 server connected by a thick cable to a separate disk box labeled 'EBS — 영구 디스크', "
            "label '인스턴스 종료 → 데이터 보존 ✓', '다른 서버에 옮겨붙이기 OK'. "
            "Right card (red border): a cartoon EC2 server with a built-in disk inside, labeled 'Instance Store — 임시 디스크', "
            "with a warning icon and label '인스턴스 정지 → 데이터 사라짐 ⚠️'. "
            "Top center bold Korean title 'EBS vs Instance Store — 영구 vs 임시' in deep navy."
        ),
    },
    {
        "id": "ebs_volumes",
        "prompt": (
            f"{STYLE}"
            "Four colorful cards in 2x2 grid on cream background, each representing an EBS volume type: "
            "Card 1 (cyan): 'gp3 — 가성비 최고' with general workload icon; "
            "Card 2 (gold): 'io2 — 초고속 IOPS' with rocket icon; "
            "Card 3 (green): 'st1 — 처리량형 (빅데이터)' with chart icon; "
            "Card 4 (gray-blue): 'sc1 — 콜드 데이터 (저장만)' with snowflake icon. "
            "Top center bold Korean title 'EBS 볼륨 4가지 타입' in deep navy. "
            "Bottom: small text '99% 케이스: gp3로 시작'."
        ),
    },
    {
        "id": "snapshot",
        "prompt": (
            f"{STYLE}"
            "Diagram on cream background. Left: an EBS volume disk icon. Big arrow rightward labeled '자동 백업'. "
            "Right: an S3 bucket icon containing 3 stacked snapshot files labeled 'Snapshot Day 1 (전체)', "
            "'Snapshot Day 2 (변경 블록만)', 'Snapshot Day 3 (변경 블록만)'. "
            "Below: a clock with text '매일 새벽 자동' and a recovery icon with text '5분 만에 복구'. "
            "Top center bold Korean title 'EBS 스냅샷 — 백업의 핵심' in deep navy."
        ),
    },
    {
        "id": "pricing",
        "prompt": (
            f"{STYLE}"
            "Three large pricing cards stacked horizontally on cream background, each with a price tag: "
            "Card 1 (cyan): '온디맨드 — $1.00/시간' with text '자유 / 비싸요' and a clock icon; "
            "Card 2 (green): '예약 인스턴스 — $0.28/시간 (-72%)' with text '1~3년 약정' and a calendar icon; "
            "Card 3 (gold): '스팟 인스턴스 — $0.10/시간 (-90%)' with text '여유 자원 / 중단 가능' and a lightning icon. "
            "Top center bold Korean title 'EC2 요금 3가지 모드' in deep navy. "
            "Bottom: '운영 = 예약 + 개발 = 온디맨드 + 배치 = 스팟'."
        ),
    },
    {
        "id": "keypair_ssh",
        "prompt": (
            f"{STYLE}"
            "A cartoon scene with a giant ornate brass key icon labeled 'Keypair (.pem)' floating in air, "
            "with bright sparkle effect. Below the key, a cartoon EC2 server with a closed door, "
            "the key fitting into the keyhole. Korean male engineer holds a USB drive labeled 'Backup'. "
            "Three warning badges floating: '⚠️ GitHub 금지', '⚠️ 권한 600', '⚠️ 분실하면 영원히 못 들어감'. "
            "Top center bold Korean title '키페어 = SSH 접속 열쇠' in deep navy."
        ),
    },
    {
        "id": "user_data",
        "prompt": (
            f"{STYLE}"
            "An EC2 server icon on left with a script document scrolling out of it labeled '#!/bin/bash\\nyum install nginx', "
            "the script glowing yellow. Then arrow showing the server transforming with Nginx logo appearing on top. "
            "Below: 5 identical EC2 servers in a row with same Nginx logo, labeled '동일 자동 배포'. "
            "Top center bold Korean title 'User Data — 부팅 시 자동 실행' in deep navy. "
            "Bottom: small text '손으로 깔던 시대 끝'."
        ),
    },
    {
        "id": "sg_reference",
        "prompt": (
            f"{STYLE}"
            "Side-by-side comparison on cream background. "
            "Left card (red border, faded): SG with 'Source: 10.0.1.5' explicit IP, then arrow to 5 servers "
            "with different IPs '10.0.1.5, .6, .7, .8, .9' all marked X (mismatch). "
            "Right card (green border): SG with 'Source: sg-web (참조)', arrow to 5 servers all green checkmarks. "
            "Top center bold Korean title 'SG 소스 = IP 대신 SG 참조' in deep navy. "
            "Bottom: 'Auto Scaling 환경에서 IP는 계속 바뀐다'."
        ),
    },
    {
        "id": "netflix",
        "prompt": (
            f"{STYLE}"
            "Cartoon Netflix-style red 'N' logo (just the letter N, no actual Netflix branding) on left, "
            "with arrow to a globe surrounded by tens of small EC2 server icons forming a constellation. "
            "Three big stat badges floating: '☁️ EC2 수만 대', '⚡ 70% Spot 인스턴스', '💰 비용 -60%'. "
            "Bottom: a uptime gauge showing '99.999%' in green. "
            "Top center bold Korean title '넷플릭스 — EC2 글로벌 운영' in deep navy. "
            "Cream background, friendly tone."
        ),
    },
    {
        "id": "trouble",
        "prompt": (
            "Korean educational infographic, cream paper background. "
            "Top center bold red title '흔한 3가지 함정'. "
            "Three numbered cards stacked vertically with warning icons: "
            "Card 1 (red border): '① 키페어 분실 — .pem 백업 안 함'; "
            "Card 2 (orange border): '② Instance Store에 DB 저장 — 데이터 증발'; "
            "Card 3 (yellow border): '③ SG 0.0.0.0/0으로 SSH 22 개방 — 봇 공격'. "
            "Cartoon worried Korean male consultant on right with question mark. "
            "Bottom: '이 셋만 피해도 절반 안전 ✓'."
        ),
    },
    {
        "id": "five_lessons",
        "prompt": (
            "Korean educational infographic, cream paper background. "
            "Top center bold large title '4일차 핵심 5문장' in deep navy. "
            "Five numbered horizontal cards stacked with checkmarks and accent border colors: "
            "'① EC2 = 컴퓨터 렌탈샵, 자유 선택'; "
            "'② VPC는 직접 설계해야 안전'; "
            "'③ Public/Private 차이는 IGW 라우팅 단 하나'; "
            "'④ SG 소스는 IP 대신 SG 참조'; "
            "'⑤ User Data = 재현 가능 인프라의 시작'."
        ),
    },
    {
        "id": "outro",
        "prompt": (
            f"{STYLE}"
            "Friendly cartoon Korean male consultant on left holding a glowing EC2 server icon. "
            "To his right a roadmap path leading from '오늘 4일차 — VPC + EC2' (small label) to a glowing destination "
            "labeled '내일 5일차 — ALB + Auto Scaling' showing scale-balance icon and growing server stack. "
            "Above the path floating cloud icons. "
            "Top center bold Korean title '내일은 ALB + Auto Scaling' in deep navy. "
            "Below: small warm text '한 대 인프라가 자동 확장으로'. "
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
