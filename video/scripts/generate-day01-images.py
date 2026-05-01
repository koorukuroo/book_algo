"""Generate visual assets for the DAY01 DX Consultant video via Higgsfield API."""
from __future__ import annotations

import sys
import time
import urllib.request
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "images" / "day01"
OUT_DIR.mkdir(parents=True, exist_ok=True)

API_BASE = "http://localhost:8092/api/v1"
API_KEY = "hf_x2DMaqeoAeTWlDwMVrLPK-LnuA96SNsvB8JJ1-BD-mU"
HEADERS = {"X-API-Key": API_KEY, "Content-Type": "application/json"}

STYLE = (
    "Clean modern flat illustration style, warm cream paper-textured background, "
    "high contrast friendly cartoon characters with corporate Korean business aesthetic, "
    "soft pastel palette with deep navy blue, warm teal, and golden yellow accents, "
    "no logos, no extra captions other than the specified Korean text. "
    "Educational infographic energy, professional yet friendly. "
)

ASSETS = [
    {
        "id": "title",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "Centered massive bold Korean title text 'DX 컨설턴트의 시야 열기' in deep navy blue, "
            "subtitle below: '1일차 — 클라우드 전문가의 진짜 무기'. "
            "Visual: a stylized cartoon figure of a friendly Korean male consultant in a "
            "navy blue suit standing confidently with arms slightly open, beside him "
            "soft glowing icons floating: a magnifying glass, a lightbulb, a cloud icon, "
            "a chart icon, all interconnected by gentle dotted lines. "
            "Behind him a warm sunrise-style gradient with soft yellow and teal hues. "
            "YouTube thumbnail energy, professional and inviting."
        ),
    },
    {
        "id": "hook_request",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "A cartoon scene of a Korean businessman in a gray suit (the IT executive of company A) "
            "speaking earnestly with hands gesturing, a speech bubble above him containing "
            "Korean text '클라우드로 옮겨주세요!'. To his right, a younger cartoon Korean male consultant "
            "in a navy suit smiling confidently with thumbs up, with a small thought bubble showing "
            "a cloud icon. Behind them a simple office background with a window. "
            "On the lower right, a small calendar showing '2주' marked. Cream background. "
            "No women in this image, both characters are male."
        ),
    },
    {
        "id": "hook_disaster",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "A 2x2 grid layout on cream background showing 4 frustrated cartoon Korean characters in "
            "different roles, each in their own colored frame: "
            "top-left a male field worker in blue work uniform holding a tablet that shows a red X "
            "with text '태블릿 사용 불가'; "
            "top-right a male factory manager in white shirt frowning at a silent phone with text '실시간 알림 없음'; "
            "bottom-left a male executive in suit looking shocked at a chart showing a red upward arrow "
            "with text '비용 2배'; "
            "bottom-right a male security officer with crossed arms next to a red warning shield "
            "with text '감사 이슈'. "
            "Top center bold Korean title '참담한 결과' in coral red. All four characters are male."
        ),
    },
    {
        "id": "ge_case",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "An infographic on cream background. Left side: a large GE-style industrial building "
            "icon with money bills and dollar signs ($) flying into it, labeled '70억 달러 투자' in navy. "
            "Center: a big downward red arrow with text '목표 150억 → 실제 12억'. "
            "Right side: the same building cracking and splitting into 3 smaller building icons "
            "labeled '항공', '전력', '헬스케어'. "
            "Top center bold Korean title 'GE의 70억 달러 실패' in deep navy. "
            "Below in smaller text '문제 정의 없는 거대한 답'. "
            "A subtle background of falling stock-chart line going down."
        ),
    },
    {
        "id": "einstein",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "A cartoon stylized portrait of Albert Einstein on the left with his iconic wild white hair "
            "and warm smile, holding a stopwatch. To his right a giant clock face divided into two pie "
            "sections: a huge yellow section labeled '55분 — 문제 정의' taking up most of the clock, "
            "and a tiny orange slice labeled '5분 — 답 찾기'. "
            "Above in handwritten-style Korean text '문제를 정의하는 데 55분, 답에는 5분'. "
            "Below in smaller text '진짜 위험은 잘못된 질문'. Cream background with subtle "
            "chalkboard equation marks. Educational and warm."
        ),
    },
    {
        "id": "real_problem",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "A two-column comparison infographic on cream background. "
            "Left column header in coral '고객의 말 (솔루션)': three speech bubbles stacked: "
            "'서버가 느려요', '앱을 새로 만들어주세요', '보안이 불안해요'. "
            "Right column header in teal '진짜 문제 (원인)': three matching boxes: "
            "'DB 쿼리 병목', '모바일 미지원', '접근 로그 미수집'. "
            "Between them a row of 3 navy-blue arrows with the Korean word '왜?' written above each arrow "
            "in golden yellow. Top center bold Korean title '왜?라고 물어라'. "
            "Friendly, educational style."
        ),
    },
    {
        "id": "doctor",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "A split-screen infographic on cream background. "
            "Left side: a friendly cartoon Korean female doctor in a white coat with stethoscope, "
            "holding a clipboard with checklist marks. Above her in Korean '의사의 문진표'. "
            "A double-arrow with '↔' symbol in the middle. "
            "Right side: a friendly cartoon Korean male consultant in a navy suit also holding a clipboard. "
            "Above him in Korean '컨설턴트의 5W1H'. "
            "Bottom center: 6 colorful circles arranged horizontally each labeled with one of: "
            "'What 무엇', 'Who 누가', 'When 언제', 'Where 어디서', 'Why 왜', 'How 어떻게'. "
            "The 'Why 왜' circle is highlighted larger with a golden glow."
        ),
    },
    {
        "id": "quantify",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "A 'before vs after' transformation infographic on cream background. "
            "Five horizontal rows, each showing a vague Korean word on the left in faded gray with X mark, "
            "an arrow in middle, then a precise number on the right in bold navy with checkmark: "
            "Row 1: '느려요' → '평균 응답 8초'; "
            "Row 2: '많아요' → '일 평균 350건'; "
            "Row 3: '자주 장애' → '월 4회, 2시간'; "
            "Row 4: '비싸요' → '월 500만원'; "
            "Row 5: '불편해요' → '입력 30분/회'. "
            "Top center bold Korean title '숫자가 KPI를 만든다' in deep navy. "
            "Each row has a subtle alternating background tint."
        ),
    },
    {
        "id": "stakeholder",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "A 2x2 matrix diagram on cream background. "
            "X-axis labeled '관심도 →', Y-axis labeled '↑ 영향력'. "
            "Four quadrants each containing a cartoon person icon and Korean label: "
            "Top-left (high influence, low interest): a male executive icon highlighted with a "
            "PULSING RED WARNING border and label '핵심 관리 ⚠️ 보안팀/IT팀'; "
            "Top-right (high influence, high interest): a male executive with full color and label '긴밀 협업 — 경영진'; "
            "Bottom-left (low influence, low interest): a small faded icon labeled '모니터링'; "
            "Bottom-right (low influence, high interest): a friendly icon labeled '정보 공유 — 사용자'. "
            "Top center bold Korean title '이해관계자 매트릭스' in deep navy."
        ),
    },
    {
        "id": "asis_tobe",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "A horizontal flow infographic on cream background. "
            "Left side: a gray box labeled 'As-Is 현재' showing a cartoon old desktop PC with cobwebs, "
            "stacks of paper, and a clock saying '느림'. "
            "Center: a large gradient arrow pointing right, labeled 'SMART 원칙' in golden yellow. "
            "Right side: a teal box labeled 'To-Be 목표' showing a sleek cartoon laptop with "
            "a glowing cloud above it and a target icon. "
            "Below in 5 small horizontal pill-shaped tags: 'S 구체적', 'M 측정 가능', "
            "'A 달성 가능', 'R 비즈니스 연결', 'T 기한'. "
            "Top center bold Korean title 'As-Is → To-Be 설계'."
        ),
    },
    {
        "id": "kpi_roi",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "A financial infographic on cream background. "
            "Left side: a stack of red coins and bills labeled '현재 11.9억/년'. "
            "Big arrow rightward with '클라우드 전환' label. "
            "Right side: a smaller green stack labeled '전환 후 3.1억/년'. "
            "Bottom: three big numerical badges in row: "
            "Badge 1 with golden yellow border: '연간 절감 8.8억'; "
            "Badge 2 with deep navy border: 'ROI 151%'; "
            "Badge 3 with teal border: '회수 4.8개월'. "
            "Top center bold Korean title '경영진을 움직이는 ROI' in deep navy. "
            "A small cartoon executive on the right giving a thumbs up."
        ),
    },
    {
        "id": "well_architected",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "Six tall colorful pillars standing in a row on cream background, like a Greek temple. "
            "Each pillar has a different pastel color (navy, coral, mint, gold, teal, lavender) "
            "and a label and small icon at the top: "
            "Pillar 1 '운영 우수성' with gear icon; "
            "Pillar 2 '보안' with shield icon; "
            "Pillar 3 '안정성' with chain link icon; "
            "Pillar 4 '성능 효율성' with rocket icon; "
            "Pillar 5 '비용 최적화' with money icon; "
            "Pillar 6 '지속가능성' with leaf icon. "
            "Above the pillars a horizontal balance beam keeping them in equilibrium. "
            "Top center bold Korean title 'AWS Well-Architected 6기둥' in deep navy. "
            "Below: small text '모든 기둥 100점이 아닌 적정 균형'."
        ),
    },
    {
        "id": "competencies",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "A central cartoon Korean male consultant in navy suit at center with a confident smile, "
            "surrounded by 5 colorful pentagon-shaped badges arranged in a circle around him, "
            "each connected by a soft glowing line: "
            "Badge top '🔍 문제 구조화'; "
            "Badge upper-right '🏗️ 아키텍처 설계'; "
            "Badge lower-right '📊 비즈니스 소통'; "
            "Badge lower-left '☁️ 클라우드 역량'; "
            "Badge upper-left '🎯 프로젝트 관리'. "
            "Top center bold Korean title 'DX 컨설턴트 5대 역량' in deep navy. "
            "Cream background with very subtle radial glow behind the consultant."
        ),
    },
    {
        "id": "five_lessons",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "Five numbered horizontal cards stacked vertically on cream background, "
            "each with a different pastel left-border color: "
            "Card 1 (navy border): '① 솔루션보다 문제 정의가 먼저'; "
            "Card 2 (coral border): '② 왜?라고 물어라'; "
            "Card 3 (gold border): '③ 숫자 없는 정의는 무의미'; "
            "Card 4 (teal border): '④ 모든 기둥 100점 아닌 적정 수준'; "
            "Card 5 (mint border): '⑤ 기술은 도구, 핵심은 비즈니스 해결'. "
            "Top center bold large Korean title '1일차 핵심 5문장' in deep navy. "
            "Each card has a small relevant icon on the left and a checkmark on the right."
        ),
    },
    {
        "id": "outro",
        "ratio": "16:9",
        "prompt": (
            f"{STYLE}"
            "A friendly cartoon Korean male consultant standing on the left holding a glowing "
            "compass that points toward a horizon. To his right a roadmap path in dotted line "
            "leading from '오늘 1일차' (small label) to a glowing icon stack labeled '내일 2일차' "
            "showing a server icon, network icon, and storage icon stacked. "
            "Above the path floating cloud icons. "
            "Top center bold Korean title '내일은 IT 인프라 기본' in deep navy. "
            "Below in smaller warm text '컨설턴트 시각으로 기술을 보세요'. "
            "Sunrise gradient background with warm cream and gold."
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
