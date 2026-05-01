# 트렌드 리믹스 영상 제작 가이드

기존 콘텐츠(예: 책)를 인기 트렌드(예: 「나는 솔로」)에 접목해 만든 **이미지 기반 + 풍부한 애니메이션** 스타일의 영상 제작법을 정리합니다. 본 문서는 [`PRODUCTION_GUIDE.md`](./PRODUCTION_GUIDE.md)의 **인프라(SSOT, TTS, 자막)** 위에 얹는 **시각/연출 레이어** 가이드입니다.

대표 사례: `Solo7` (`book/video/src/chapters/Solo7.tsx`) — 책 『알고리즘, 인생을 계산하다』의 4가지 알고리즘을 「나는 솔로」 7인 선택 상황에 적용한 150초 영상.

---

## 1. 언제 이 스타일을 쓰는가

| 상황 | 적합한 방식 |
|------|------|
| 인터랙티브 알고리즘 시뮬레이션 (예: 비서 문제 슬라이딩, 산점도) | **풀커스텀 React 장면** (책 시리즈 챕터 1~2) |
| 동일한 시각 패턴이 충분 (제목·표·비교) | **슬라이드 키트** (`scenes/kit/*` — 챕터 3~11) |
| **풍부한 일러스트 + 트렌드 분위기** + **빠른 제작** | **이미지 기반 + 애니메이션 오버레이** ← 이 가이드 |

이미지 기반 방식의 장점:
- 챕터당 React 코드 ~150줄 (풀커스텀 ~600줄 대비 1/4)
- AI가 한국어 텍스트가 박힌 일러스트를 즉시 생성
- 일러스트 품질이 React로 손그릴 수 있는 수준을 압도
- 제작 시간: 컨셉 → 완성 영상까지 **2~3시간**

---

## 2. 4단계 워크플로우

### Step 1 — 컨셉 + 대본 (30분)
- 책의 핵심 알고리즘 N개를 트렌드 시나리오에 매핑한다.
- 트렌드: 일상에서 모두가 마주치는 결정 상황 (데이트, 면접, 식당 선택, 청소, 약속...)
- 7개 장면 구조 (Title → Setup → Trap → Algorithm → Twist → Override → Outro)
- 첫 장면은 트렌드의 시각적 hook (출연자 7인 등), 마지막은 4단계 요약 카드

### Step 2 — 이미지 생성 (15분)
- `scripts/generate-<chapter>-images.py`에 7~9개 프롬프트 정의
- 각 이미지는 **자체 완결**: 한국어 텍스트, 캐릭터, 핵심 시각 요소를 모두 포함
- 비동기 큐에 일괄 제출 → 폴링 → 다운로드

### Step 3 — 장면 합성 + 애니메이션 (1시간)
- `ImageScene`(공용 켄번즈 + 페이드) + 장면별 데코레이션
- 각 장면에 1~2개의 핵심 효과만 (단조로움 ↔ 산만함 사이의 균형)

### Step 4 — 음성/자막/렌더 (45분)
- `scripts/generate-narration.py` (백오프 포함)
- `scripts/sync-durations.py`
- `scripts/align-subtitles.py`
- `pnpm exec remotion render src/index.ts <ID> out/<id>.mp4 --concurrency=1`

---

## 3. AI 이미지 생성 베스트 프랙티스 (Higgsfield nano_banana_pro)

### 3-1. 프롬프트 구조 (검증된 템플릿)

```python
STYLE_BASE = (
    "Clean modern flat illustration style, warm cream paper-textured background, "
    "high contrast friendly cartoon characters with K-drama dating-show aesthetic, "
    "soft pastel palette with vivid coral pink and warm yellow accents, "
    "no logos, no extra captions other than the specified Korean text. "
)
```

각 이미지 프롬프트 = `STYLE_BASE` + **장면 특정 지시**:
1. **레이아웃**: "Centered massive bold Korean text..." / "Horizontal row of 7 cards..."
2. **한국어 텍스트**: 따옴표로 감싸 정확히 명시 — `'37% 법칙: 처음 2명은 관찰'`
3. **인물 명세**: 성별·인원·헤어스타일·표정 (애매하면 추측이 들어감)
4. **포커스 표시**: "Card 4 has glowing pink heart, big '결단' badge, sparkles"
5. **부정 명세**: "no men in this image" / "no clutter" — 거부 사항을 명시

### 3-2. 자주 만나는 함정

| 증상 | 원인 | 해결 |
|------|------|------|
| 한국어 글자가 깨져 나옴 | 너무 긴 프롬프트, 한글 인용 누락 | 프롬프트 200단어 이내로 단축, `'한국어 텍스트'` 따옴표 사용 |
| `result_image_url: null`로 즉시 완료 | 프롬프트 거부 (길이/내용) | 더 짧고 단순하게 재작성 후 재시도 |
| 성별이 섞여 나옴 | 명시 안 함 | "all female / no men" 또는 "all male" 명시 |
| 캐릭터 수가 안 맞음 | "several", "a few" 등 모호 | "exactly 7" / "row of 7" 정확히 |
| 포커스가 잘못된 위치에 | 위치 불명확 | "FOURTH card from the left" / "upper-right area" 명시 |

### 3-3. 이미지 자산 폴더 컨벤션

```
public/images/<chapter>/
├── title-cover.jpg       # 1번 슬라이드 + YouTube 썸네일 (16:9)
├── candidates-row.jpg    # 등장인물/대상 일렬 배치
├── trap.jpg              # 흔한 실수 일러스트
├── algorithm.jpg         # 핵심 알고리즘 시각화
├── mutual-axis.jpg       # 두 변수 산점도/매트릭스
├── override.jpg          # 클라이맥스 (감정/결정의 전환)
└── outro-summary.jpg     # 4단계 요약 그리드
```

각 이미지 5MB 내외 (2048×1152 PNG-as-JPG). 영상 인코딩에서 약 7~8 Mbps로 압축됨.

---

## 4. 정적 이미지에 생명 불어넣기 — 애니메이션 키트

`src/scenes/<chapter>/ImageScene.tsx`에 다음 컴포넌트를 갖춥니다:

### 4-1. ImageScene (켄번즈 + 페이드 + 흔들림)

```tsx
<ImageScene
  src="images/solo7/algorithm.jpg"
  durationInFrames={dur}
  zoomFrom={1.04}
  zoomTo={1.14}
  panFrom={{ x: 25, y: 50 }}    // 시작 시 카메라 초점
  panTo={{ x: 50, y: 50 }}       // 끝날 때 카메라 초점
  shakeAt={{ startFrame: 100, durationFrames: 30, intensity: 14 }}
  decoration={...}
/>
```

**핵심 트릭**: `transform-origin: ${px}% ${py}%`을 시간에 따라 보간하면 줌과 동시에 패닝이 일어남. 이미지 한 장으로 "카메라가 움직이는 듯한" 효과 완성.

**팁**: zoomFrom < zoomTo (점점 줌인) → 텐션 상승. zoomFrom > zoomTo (줌아웃) → 충격 후 안도/현실 자각 (Trap 장면 등).

### 4-2. 효과 라이브러리

| 컴포넌트 | 용도 | 시각 효과 |
|---------|------|----------|
| `FloatingHearts` | 따뜻함, 사랑, 축하 | 하트 입자가 아래→위로 떠오르며 페이드 |
| `Sparkles` | 마법, 등장, 강조 | ✨가 화면 곳곳에서 깜빡임 |
| `Confetti` | 결말 축하, 성공 | 색종이가 회전하며 떨어짐 |
| `SpotlightSweep` | 인트로, 장면 전환 | 사선 빛띠가 좌→우로 슬라이딩 |
| `HighlightWalk` | 순차 강조 (예: 카드 1→2→3→4) | 스포트라이트가 정해진 좌표를 차례로 비춤 |
| `Glow` | 부드러운 강조 (정적) | 특정 위치에 호흡하는 라디얼 글로우 |
| `PopStamp` | 충격/유머/낙관 | 도장이 스프링으로 팝업 ("앗!", "대박!", "결단!") |
| `BobArrow` | 명확한 포인터 | 위아래로 까딱이는 이모지 (👇 ⭐ 💖) |
| `Flash` | 충격 순간 | 0.3초 색상 플래시 (전체 화면) |

### 4-3. 장면별 성격 부여 — Solo7 사례

같은 효과를 모든 장면에 쓰면 단조롭습니다. 각 장면에 **고유한 무드**를 부여하세요.

| 장면 | 무드 | 사용 효과 |
|------|------|----------|
| Title | 활기찬 인트로 | FloatingHearts + SpotlightSweep |
| Setup | 등장인물 소개 | 좌→우 SpotlightSweep + 카메라 패닝 |
| Trap | 충격/실수 자각 | 줌인→줌아웃 + Shake + Flash + PopStamp |
| Algorithm | 핵심 메커니즘 | HighlightWalk(순차 비춤) + BobArrow |
| Twist (Mutual) | 새 변수 등장 | Glow + BobArrow |
| Override | 감정 클라이맥스 | FloatingHearts + Glow |
| Outro | 마무리 축하 | Confetti |

**원칙**: 한 장면에 효과 1~2개. 3개 이상이면 산만해집니다.

---

## 5. 자주 만나는 함정과 해결

### 5-1. `mixBlendMode: "screen"`은 크림 배경에서 안 보입니다
- 증상: 글로우/스포트라이트가 렌더링은 되지만 화면에 거의 안 보임
- 원인: `screen` 모드는 어두운 픽셀에 색을 더하지만, `#fff4ed` 같은 밝은 배경에는 효과가 없음
- 해결: `mixBlendMode` 제거하고 `opacity`로 직접 제어. 밝은 배경에는 약간 진한 색이 더 잘 보임

```tsx
// ❌ 안 보임
background: `radial-gradient(circle, ${color}, transparent)`,
mixBlendMode: "screen",

// ✓ 보임
background: `radial-gradient(circle, ${color} 0%, ${color}88 25%, transparent 65%)`,
opacity: breathe * 0.65,
```

### 5-2. 펄스 링은 위치 보정이 까다롭습니다
- 증상: 켄번즈 패닝하는 동안 펄스 링 위치가 점점 어긋남
- 원인: 펄스는 화면 좌표(고정), 이미지는 패닝(이동) — 동기화가 어려움
- 해결: 펄스보다 `BobArrow`(이미지 위에서 흔들리는 이모지)나 `Glow`(부드러운 영역)이 더 안정적. 정확한 위치 강조가 필요하면 패닝을 멈추거나(zoom만 사용), 카메라 종료 위치에 펄스를 맞춤

### 5-3. 모든 장면에 같은 효과는 NG
- 증상: 펄스 링을 7장면에 다 넣었더니 단조롭다는 피드백
- 해결: 위 4-3 표처럼 장면당 다른 효과를 1~2개만 적용

### 5-4. 영상 파일 크기 폭등 (12 MB → 150 MB)
- 원인: 풀스크린 고해상도 이미지(2k JPG 5 MB)는 React 그래픽보다 인코딩 비효율적
- 결과: 1080p 6.8 Mbps — 유튜브 업로드 권장(8 Mbps) 이내, 큰 문제 아님
- 절약하고 싶다면: 이미지를 사전에 1920×1080으로 리사이즈
  ```bash
  sips -Z 1920 -s format jpeg -s formatOptions 88 input.jpg --out output.jpg
  ```

### 5-5. AI가 "X1 + X2 + ..." 시퀀스로 결과 None을 반환
- 원인: 프롬프트 길이/내용 거부
- 해결: 단축 + 재시도. 프롬프트 200단어 이내, 따옴표 한국어 명시, "no [거부할 것]" 명시

---

## 6. 트렌드 결합 콘텐츠의 강점

### 6-1. 검색 트래픽 흡수
"나는 솔로" 신규 회차 발표 직후 검색이 폭증합니다. 그 흐름에 올라타면 평소 노출보다 5~10배 높은 임프레션을 받을 수 있습니다.

### 6-2. 본편-쇼츠 더블 푸시
- **본편 (2~3분)**: 풀 시리즈 컨텍스트 + 알고리즘 설명
- **쇼츠 (60초)**: 가장 강한 hook 구간 (예: "처음 2명은 무조건 패스")만 잘라 세로 1080×1920로 별도 업로드 → 본편 유입

### 6-3. 시리즈 알고리즘 학습
시리즈에 별도 컴포지션 ID(예: `Solo7`)로 추가하면 동일 채널의 본편 시리즈와 함께 추천 알고리즘에 학습됩니다.

### 6-4. 댓글 참여 유도
트렌드 주제는 의견이 갈리는 것이 자연스럽습니다.
> "당신이라면 7명 중 몇 번을 고르시겠어요?"
이 질문 하나로 댓글 수가 평소의 3~5배가 됩니다.

---

## 7. 시각 정체성 — 시리즈와 분리

본편 책 시리즈와 다른 무드를 명시적으로 디자인하세요.

```ts
// src/scenes/solo7/style.ts
export const solo7 = {
  bg: "#fff4ed",         // 따뜻한 크림 (책 시리즈 #fbf3e8과 미세하게 다름)
  pink: "#ff5d8f",       // 코럴 핑크 — 데이트쇼 정체성
  pinkSoft: "#ffd4e1",
  gold: "#f5b400",
  // ... mint, sky, lavender 보조
};

export const solo7Fonts = {
  display: "Gaegu, sans-serif",     // 본편과 동일 폰트
  body: "Gowun Dodum, sans-serif",
};
```

폰트는 일관, 색상은 분리. 시청자가 "같은 채널의 다른 시리즈"라는 걸 직관적으로 인지합니다.

---

## 8. 한국어 TTS 자연 발음 — 단위명사 (재확인)

이미지 안 텍스트는 디지털 숫자(`7명`, `4번째`), 음성은 한글(`일곱 명`, `네 번째`).

```jsonc
{
  "id": "title",
  "text": "나는 솔로의 수학. 7명 중 단 1명, 어떤 전략?",
  "tts_text": "나는 솔로의 수학. 일곱 명 중 단 한 명, 어떤 전략?"
}
```

[`PRODUCTION_GUIDE.md` §5-2](./PRODUCTION_GUIDE.md#5-2-한국어-발음-분리-필요-시-tts_text) 참조.

**리믹스 콘텐츠에서 자주 등장하는 표현**:
- N명 → 한·두·세·네·다섯·여섯·일곱·여덟·아홉·열 명
- N번째 → 첫·두·세·네·다섯·여섯·일곱·여덟·아홉·열 번째
- N살 → 한·두·세·...스무·스물한·서른 살
- N개 → 한·두·...열·열한·스무 개

---

## 9. 품질 체크리스트

영상 출시 전:

- [ ] **이미지 일관성**: 7~9개 이미지가 동일 스타일/팔레트로 통일됐는가
- [ ] **인물 정합성**: 성별/인원/위치 강조가 의도대로인가 (Solo7 사례에서 algorithm.jpg를 두 번 재생성)
- [ ] **TTS 자연스러움**: 단위명사 native 표기, 영문 약어 음차
- [ ] **자막 가독성**: 22자 이하, 4초 이하
- [ ] **장면 무드 다양성**: 7장면 모두 다른 효과 조합 (단조로움 회피)
- [ ] **켄번즈 방향**: 콘텐츠 흐름과 일치 (좌→우, 줌인 vs 줌아웃)
- [ ] **포커스 강조 위치 검증**: 글로우/펄스/화살표가 의도한 인물·요소를 정확히 가리키는가 (실제 렌더 프레임 추출해 확인)
- [ ] **음향-시각 동기**: 강조 효과가 내레이션 키워드 시점과 맞는가
- [ ] **YouTube 썸네일 별도**: 첫 프레임이 너무 정적이면 별도 썸네일 사용

---

## 10. 코드 위치 (Solo7 사례)

| 파일 | 역할 |
|------|------|
| `scripts/narrations/solo7.json` | 대본 SSOT (text + tts_text) |
| `scripts/generate-solo7-images.py` | 이미지 생성 (Higgsfield API 호출) |
| `public/images/solo7/*.jpg` | 7개 장면 이미지 자산 |
| `public/audio/solo7/*.mp3` | 음성 (ElevenLabs 생성) |
| `src/scenes/solo7/ImageScene.tsx` | 켄번즈 + 모든 데코 컴포넌트 |
| `src/scenes/solo7/style.ts` | 시각 정체성 (코럴 핑크/골드) |
| `src/chapters/Solo7.tsx` | 7개 장면 SCENE_CFG + 합성 |
| `src/Root.tsx` | `Solo7` Composition 등록 |
| `src/subtitles-solo7.json` | 정렬된 자막 큐 (자동 생성) |

---

## 11. 포함된 효과 — 코드 한 눈에 보기

```tsx
// src/chapters/<your-trend>.tsx
const SCENE_CFG: Record<string, SceneCfg> = {
  title: {
    src: "images/<chapter>/title-cover.jpg",
    zoomFrom: 1.0, zoomTo: 1.1,
    decoration: (dur) => (
      <>
        <FloatingHearts count={14} durationInFrames={dur} />
        <SpotlightSweep durationInFrames={Math.floor(dur * 0.6)} startFrame={20} />
      </>
    ),
  },
  trap: {
    src: "images/<chapter>/trap.jpg",
    zoomFrom: 1.18, zoomTo: 1.0,
    panFrom: { x: 30, y: 50 }, panTo: { x: 50, y: 55 },
    shakeAt: { startFrame: 100, durationFrames: 30, intensity: 14 },
    decoration: () => (
      <>
        <Flash startFrame={100} durationFrames={10} color="#ff5d8f" intensity={0.35} />
        <PopStamp text="앗!" x={75} y={28} appearAt={108} rotate={-12} size={84} />
      </>
    ),
  },
  algorithm: {
    src: "images/<chapter>/algorithm.jpg",
    zoomFrom: 1.04, zoomTo: 1.14,
    panFrom: { x: 25, y: 50 }, panTo: { x: 50, y: 50 },
    decoration: () => (
      <>
        <HighlightWalk
          stops={[{x:22,y:52},{x:33,y:52},{x:44,y:52},{x:51,y:52}]}
          startFrame={120} stepFrames={50} size={320}
        />
        <BobArrow x={51} y={18} appearAt={420} emoji="👇" />
      </>
    ),
  },
  outro: {
    src: "images/<chapter>/outro-summary.jpg",
    zoomFrom: 1.0, zoomTo: 1.08,
    decoration: () => <Confetti count={32} />,
  },
};
```

---

## 12. 다음 트렌드 리믹스 후보 (브레인스토밍)

같은 패턴으로 만들 수 있는 콘텐츠 예시:

| 트렌드 주제 | 책 알고리즘 매핑 |
|------------|------------------|
| 흑백요리사 100인 → 1인 | 비서 문제 + 단판 토너먼트의 한계 (챕터 1·3) |
| 피지컬 100 — 누가 살아남나 | 토너먼트 + 정렬 알고리즘 (챕터 3) |
| 다이어트, 언제 그만둘까 | 일찍 멈추기 + 과적합 (챕터 7) |
| 회사 그만두는 타이밍 | Bezos 후회 최소화 + 인터벌 (챕터 1·2) |
| 부동산 매매 타이밍 | 베이즈 추론 + 코페르니쿠스 prior (챕터 6) |
| 비밀번호 만들기 | 무작위 + 밀러-라빈 (챕터 9) |
| 카톡 답장 타이밍 | 지수적 백오프 (챕터 10) |
| 정리정돈 강박 | 캐싱 + LRU + "어수선함에 베팅" (챕터 3·4) |

각 주제별로 같은 4단계 워크플로우를 반복하면 시리즈가 빠르게 늘어납니다. 시청자는 "이 채널이 알고리즘적으로 인생 문제를 해석해주는 곳"으로 인식하게 됩니다.

---

## 핵심 한 줄

> **이미지가 8할, 애니메이션이 2할, 그러나 그 2할이 단조로움과 살아있음의 차이를 만든다.**

기존 책 시리즈와 다른 결의 영상을 만들 때:
1. AI에게 일러스트의 80%를 맡기고
2. Remotion 애니메이션 키트로 생명을 불어넣고
3. 트렌드의 검색 흐름에 올라타라.

3시간이면 새 영상 1편을 시리즈에 추가할 수 있습니다.
