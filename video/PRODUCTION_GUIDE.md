# 한국어 내레이션 영상 제작 가이드

이 문서는 Remotion + ElevenLabs + WhisperX 조합으로 한국어 내레이션이 입혀진 1080p 영상을 제작하는 전체 파이프라인을 정리합니다. 다른 프로젝트에서도 그대로 차용할 수 있도록 핵심 패턴, 함정, 베스트 프랙티스를 모두 담았습니다.

---

## 1. 결과물 사양

- **포맷**: MP4, H.264 + AAC
- **해상도**: 1920×1080 @ 30 fps
- **길이**: 챕터당 100~165초
- **구성**: TTS 한국어 내레이션 + 동기화 자막 + 시각 장면 + 영구 로고 오버레이
- **편당 용량**: 약 9~14 MB

## 2. 시스템 요구사항

| 도구 | 버전 | 용도 |
|------|------|------|
| Node.js | 20+ (pnpm 권장) | Remotion 실행 |
| Python | **3.10+** (3.12 권장) | TTS · 자막 정렬 |
| ffmpeg / ffprobe | 5+ | 오디오 측정 · 인코딩 |
| `faster-whisper` | 1.2+ | 1차 전사 sanity check |
| `whisperx` | latest | 단어 단위 강제정렬 |
| `elevenlabs` (Python) | latest | TTS 호출 |
| Chrome Headless | 자동 설치 | Remotion 렌더 |

`whisperx`는 Python 3.10+에서만 동작합니다. Anaconda Python 3.9 같은 구버전은 별도 venv가 필요합니다.

```bash
/opt/homebrew/bin/python3.12 -m venv .venv-whisper
./.venv-whisper/bin/pip install faster-whisper whisperx
```

환경 변수는 프로젝트 루트의 `.env`에:
```
ELEVENLABS_API_KEY=sk_...
```

## 3. 디렉토리 구조 (검증된 레이아웃)

```
project/
├── .env                                      # ELEVENLABS_API_KEY
├── video/
│   ├── package.json                          # Remotion + React 19
│   ├── tsconfig.json                         # resolveJsonModule + Bundler
│   ├── src/
│   │   ├── index.ts                          # Remotion 엔트리
│   │   ├── Root.tsx                          # Composition 등록 (모든 챕터)
│   │   ├── theme.ts                          # 색상·폰트 토큰
│   │   ├── load-fonts.ts                     # 한국어 Google Fonts
│   │   ├── narration.ts                      # JSON 헬퍼 (computeScenes 등)
│   │   ├── Subtitles.tsx                     # 자막 컴포넌트
│   │   ├── chapters/
│   │   │   ├── Chapter1.tsx                  # 챕터별 합성
│   │   │   └── ...
│   │   ├── scenes/
│   │   │   ├── ch01/                         # 풀커스텀 장면 (선택)
│   │   │   └── kit/                          # 재사용 슬라이드 템플릿
│   │   │       ├── SlideTitle.tsx
│   │   │       ├── SlideHook.tsx
│   │   │       ├── SlideConcept.tsx          # table·bigNumber·comparison·list
│   │   │       └── SlideOutro.tsx
│   │   ├── subtitles-ch01.json               # 자막 큐 (자동 생성)
│   │   └── ...
│   ├── public/
│   │   ├── audio/
│   │   │   ├── ch01/title.mp3
│   │   │   └── ...                           # 챕터별 폴더
│   │   └── images/
│   │       ├── coredot-logo.png
│   │       ├── chapters/                     # 표지 이미지
│   │       ├── webtoons-v/                   # 9:16 세로 일러스트
│   │       └── webtoons-h/                   # 16:9 가로 일러스트
│   ├── scripts/
│   │   ├── narrations/
│   │   │   ├── ch01.json                     # 단일 출처
│   │   │   └── ...
│   │   ├── generate-narration.py             # ElevenLabs TTS
│   │   ├── sync-durations.py                 # 오디오 → 장면 길이 동기화
│   │   ├── align-subtitles.py                # WhisperX 강제정렬
│   │   └── asr-diff-ch01.txt                 # ASR 점검 로그 (자동 생성)
│   └── out/
│       └── chapter1.mp4                      # 최종 산출물
└── notes/                                    # 콘텐츠 자료
```

## 4. 핵심 원칙: 단일 출처(SSOT)

**모든 타이밍은 `scripts/narrations/<chapter>.json` 한 곳에서 결정**됩니다. 이걸 어기면 자막과 영상이 즉시 어긋납니다.

```jsonc
{
  "voice_id": "CNWaK8z23h5XkHBsoh9s",
  "model_id": "eleven_v3",
  "fps": 30,
  "scenes": [
    {
      "id": "lesson",
      "from": 210,
      "duration": 690,
      "text": "11개의 챕터를 지나오며…",         // 자막 + 화면 텍스트
      "tts_text": "열한 개의 챕터를 지나오며…"   // (선택) TTS 전용
    }
  ]
}
```

이 JSON 하나로:
- `Chapter*.tsx` → `<Sequence>` 시작/길이 계산
- `Root.tsx` → `durationInFrames`
- `generate-narration.py` → ElevenLabs 호출 텍스트
- `sync-durations.py` → 오디오 길이 측정 후 자기 자신 갱신
- `align-subtitles.py` → 자막 큐의 시작 프레임 계산

`Chapter*.tsx`에서는 절대 길이를 하드코딩하지 마세요:
```ts
// 좋음
const SCENES = computeScenes("ch01", narration as Narration);

// 나쁨 — 한 번 어긋나면 영원히 어긋남
const SCENES = { title: { from: 0, dur: 300 }, … };
```

## 5. 워크플로우 (단계별)

### 5-1. 대본 작성 (`scripts/narrations/<id>.json`)

초기에는 길이를 대충 추정해도 됩니다 (`sync-durations.py`가 나중에 정확히 맞춰줍니다). **`text` 필드는 자막에 그대로 표시되는 형태**로 작성합니다.

장면 구성 권장:
- `title` (~9s): 챕터 번호 + 큰 제목
- `hook` (~18s): 일상 시나리오 + 세로 웹툰
- 본론 (~25–30s) × 2~3개: 알고리즘/개념/스토리
- `outro` (~14s): 인용구 + 다음 챕터 예고

내레이션 한 줄당 5~7초 분량이 자막 가독성에 좋습니다.

### 5-2. 한국어 발음 분리 (필요 시 `tts_text`)

ElevenLabs는 숫자를 거의 항상 **한자식 숫자(Sino)** 로 읽습니다. 한국어 단위명사 앞에서는 자연스럽지 않은 경우가 많아요.

**네이티브 풀어쓰기가 필요한 단위명사**:

| 단위 | 예시 (text → tts_text) |
|------|----------------------|
| 명 | 11명 → 열한 명 |
| 개 | 8개 → 여덟 개 |
| 번째 | 5번째 → 다섯 번째 |
| 살 | 22살 → 스물두 살 |
| 쌍 | 10쌍 → 열 쌍 |
| 마리, 통, 권, 채 등 | 동일 패턴 |

**Sino로 두어도 자연스러운 경우** (변환 불필요):
- 연도: 1611년, 1969년
- 퍼센트: 37퍼센트, 95퍼센트
- 분수/소수: 31분의 16, 26.1세
- 큰 숫자/도시 수: 33개 도시, 85,900개

`tts_text`를 추가하면 음성은 한글로 자연스럽게 들리고 자막은 디지털 숫자로 깔끔하게 표시됩니다.

### 5-3. 음성 생성

```bash
python3 scripts/generate-narration.py ch01 ch02 ch03
# 또는
python3 scripts/generate-narration.py --all
```

내장된 보호 장치:
- 이미 존재하는 mp3는 자동 skip
- ElevenLabs 429(rate limit) 시 지수 백오프로 6회까지 재시도
- `tts_text`가 있으면 그쪽을 우선 사용

### 5-4. 길이 동기화

오디오가 만들어지자마자 **반드시** 실행:
```bash
python3 scripts/sync-durations.py ch01 ch02 ch03
```

이 스크립트가:
1. 각 mp3의 정확한 길이를 ffprobe로 측정
2. fps × 길이 + 30프레임(1초) 버퍼 → 30프레임 단위로 올림
3. 장면을 순서대로 이어 붙여 `from`/`duration` 재계산
4. JSON 자기 자신을 갱신

**중요**: `sync-durations`는 오디오가 모두 생성된 뒤에 돌려야 합니다. 그래야 `Chapter*.tsx`의 `<Sequence>`와 오디오 길이가 정확히 일치해 자막이 맞아 떨어집니다.

### 5-5. 자막 정렬 (WhisperX 강제정렬)

```bash
./.venv-whisper/bin/python scripts/align-subtitles.py ch01 ch02 ch03
```

파이프라인:
1. **faster-whisper** (`small` 모델, CPU int8)로 1차 전사 → `asr-diff-<chapter>.txt`에 정답 대본 vs ASR 차이 기록 (sanity check만)
2. **WhisperX `align()`** 으로 정답 대본(`tts_text || text`)을 wav2vec2로 강제정렬 — 단어별 타임스탬프 추출
3. `tts_text`와 `text`가 다르면 **문장 단위 시간 매핑**: `tts_text`의 문장별 시간 범위를 `text`의 동일 위치 문장에 부여하고, 22자/4초 단위 큐로 분할
4. `src/subtitles-<chapter>.json`에 저장

**왜 강제정렬인가?**: Whisper의 자유 전사는 한국어 발음 오류(예: "알고리즘"→"달구리쯤")가 많지만, 정답 대본을 입력으로 주면 wav2vec2가 그 텍스트가 "오디오의 어느 시각에 발음되는지"만 찾기 때문에 정확합니다.

### 5-6. 장면 컴포넌트 작성

#### 옵션 A: 풀커스텀 (챕터 1처럼)
챕터별로 `src/scenes/ch01/*.tsx` 같은 풀커스텀 React 컴포넌트. 시각적으로 가장 풍부하지만 챕터당 ~300줄.

#### 옵션 B: 슬라이드 키트 (챕터 3+)
`src/scenes/kit/Slide*.tsx`의 재사용 가능한 컴포넌트를 prop으로 구성:

```tsx
<SlideConcept
  eyebrow="1812 · Laplace"
  title="작은 표본의 비밀"
  highlight="작은 표본"
  color="sky"
  visual={{
    kind: "bigNumber",
    number: "62",
    suffix: "/61",
    caption: "라플라스의 계승 법칙",
  }}
  footer="…"
/>
```

`SlideConcept`의 `visual.kind` 변형:
- `comparison`: 좌우 카드 두 개 (vs)
- `table`: 행/열 표 (highlight 행 강조)
- `bigNumber`: 거대 숫자 + 캡션
- `list`: 태그+제목+서브의 카드 그리드

각 슬라이드는 챕터 컬러(`accent`/`mint`/`sky`/`sun`/`plum`)를 받아 시각적 차별화. 챕터당 ~80줄로 끝납니다.

**선택 지침**: 챕터 1·2처럼 "주력 영상"은 풀커스텀, 나머지는 키트로 가는 하이브리드가 효율 대비 품질이 가장 좋습니다.

### 5-7. 챕터 합성 (`src/chapters/Chapter*.tsx`)

표준 패턴 — 모든 챕터가 거의 동일:
```tsx
import { computeScenes, type Narration } from "../narration";
import narration from "../../scripts/narrations/ch03.json";
import subs from "../subtitles-ch03.json";

const SCENES = computeScenes("ch03", narration as Narration);
const SCENE_COMPONENTS: Record<string, React.FC> = { /* 장면 id → 컴포넌트 */ };

export const Chapter3 = () => (
  <AbsoluteFill style={{ backgroundColor: theme.bg, /* ... */ }}>
    {Object.entries(SCENES).map(([id, s]) => {
      const Comp = SCENE_COMPONENTS[id];
      if (!Comp) return null;
      return (
        <Sequence key={id} from={s.from} durationInFrames={s.duration}>
          <Comp />
          <Audio src={staticFile(s.audio)} />
        </Sequence>
      );
    })}

    {/* 모든 장면 위에 영구 오버레이 */}
    <Img src={staticFile("images/coredot-logo.png")}
         style={{ position: "absolute", top: 40, right: 48, width: 140, opacity: 0.85 }} />
    <Subtitles cues={subs.cues} />
  </AbsoluteFill>
);
```

핵심 포인트:
- `<Sequence>`는 오디오를 자동으로 그 시각 범위로 잘라줍니다
- 로고와 자막은 `<Sequence>` 바깥에 두어야 모든 장면에 표시됩니다
- `computeScenes`가 자동으로 각 장면에 `audio: "audio/ch03/title.mp3"` 경로를 부착

### 5-8. 미리보기

```bash
pnpm exec remotion studio
```

브라우저에서 타임라인을 스크럽하며 자막·애니메이션·오디오 동기 확인.

### 5-9. 최종 렌더

```bash
pnpm exec tsc --noEmit
pnpm exec remotion render src/index.ts Chapter3 out/chapter3.mp4 --concurrency=1
```

**`--concurrency=1`** 권장: macOS 메모리 압박 시 안정적, 30fps 영상 100~150초가 약 2~3분 소요.

검증:
```bash
ffprobe -v error -show_entries format=duration:stream=width,height,codec_name \
  -of default=nw=1 out/chapter3.mp4
# 기대: width=1920, height=1080, codec_name=h264, codec_name=aac
```

## 6. WhisperX 강제정렬의 핵심

### 두 텍스트 매핑 (음성 vs 자막)

`tts_text != text`인 경우 자막 정렬이 깨지지 않게 하려면 **문장 단위 시간 매핑**:

```
tts_text:  "스무 명의 후보 중 1등을…"   ← 음성과 일치
text:      "20명의 후보 중 1등을…"       ← 자막에 표시
```

알고리즘 (`align-subtitles.py`의 `map_sentences_to_cues`):
1. 두 텍스트를 동일 구두점(`. ! ?`)으로 문장 분할
2. 문장 개수가 다르면 폴백 (음성 형태 사용)
3. 각 문장에 대해 wav2vec2 단어 타임스탬프로 시작·종료 시각 계산
4. `text` 문장을 22자 단위 청크로 나눠 시간을 비례 분배

이렇게 하면 음성은 자연스럽고, 자막은 시각적으로 깔끔한 디지털 숫자가 그대로 유지됩니다.

### 큐 그룹핑 휴리스틱

기본 설정 (`align-subtitles.py` 상단):
- `MAX_CUE_CHARS = 22` — 한 큐의 최대 글자 수
- `MAX_CUE_DURATION = 4.0` — 한 큐의 최대 초
- `MIN_CUE_DURATION = 0.8` — 너무 짧은 큐는 다음 큐와 병합

이 값들이 가독성에 가장 좋다고 검증되었습니다. 단, 빠른 비트(예: 코미디)에서는 `MAX_CUE_CHARS`를 18로 낮춰도 괜찮습니다.

## 7. 한국어 TTS 베스트 프랙티스

### ElevenLabs 모델/보이스
```python
voice_id = "CNWaK8z23h5XkHBsoh9s"
model_id = "eleven_v3"
output_format = "mp3_44100_128"
```

검증된 한국어 음색. 다른 보이스로 바꾸려면 ElevenLabs Voice Lab에서 한국어 라벨 voice를 선택.

### 발음 가이드

ElevenLabs가 잘못 읽기 쉬운 패턴:
- **숫자+단위**: 위 5-2 표 참조
- **외래어**: "Look-Then-Leap" → "룩 덴 리프", "TCP" → "티시피"
- **고유명사**: "Bezos" → "베조스", "Gladwell" → "글래드웰"
- **전문 용어**: "NP-hard" → 영문 그대로 두면 원어 발음, 풀어쓰면 "엔피하드"

자연스럽지 않은 발음이 들리면 `tts_text`로 한글 음차를 적어주세요.

### Rate limit 대응

`generate-narration.py`에 내장된 백오프:
```python
for attempt in range(6):
    try: ...
    except ApiError as exc:
        if exc.status_code == 429:
            time.sleep(4 * (2 ** attempt))   # 4, 8, 16, 32, 64, 128초
            continue
        raise
```

## 8. 비디오 합성 패턴

### 영구 오버레이 (모든 장면 위)

```tsx
<AbsoluteFill>
  {/* 장면 Sequences */}
  {Object.entries(SCENES).map(...)}

  {/* 영구 표시 — Sequence 밖 */}
  <Img src={staticFile("images/logo.png")} style={{ position: "absolute", ... }} />
  <Subtitles cues={subs.cues} />
</AbsoluteFill>
```

`<Sequence>` 안에 두면 그 장면에서만 보입니다.

### 애니메이션 타이밍

`spring()`과 `interpolate()`의 프레임 기준은 **장면 시작 프레임**:

```tsx
const frame = useCurrentFrame();   // 장면 내 0부터 시작
const titleScale = spring({ frame, fps, from: 0.6, to: 1 });
```

`useCurrentFrame()`은 `<Sequence>` 안에서 자동으로 0-relative입니다.

### 결정적 무작위 (hydration 안전)

```tsx
// 나쁨 — 서버/클라이언트 mismatch
const [run] = useState(() => Math.random());

// 좋음 — 결정적 시드
const SCORES = [6, 12, 3, 17, 8, 11, 19, 2, 14, 16, 5, 20, 9, 7, 13, 1, 15, 10, 4, 18];
```

Remotion 렌더는 결정적이어야 합니다. `Math.random()` 없이 미리 셔플된 배열을 쓰세요.

## 9. 자주 만나는 문제

| 문제 | 원인 | 해결 |
|------|------|------|
| 자막이 영상보다 빠르게/느리게 끝남 | 대본 JSON과 `Chapter*.tsx`의 timing 불일치 | SSOT 원칙 준수 — `computeScenes` 사용 |
| WhisperX 첫 실행 모델 다운로드 1.2GB | wav2vec2 모델 캐시 | 첫 실행만 인내 — 이후 캐시됨 |
| 자막 단어 사이 공백 사라짐 | `" ".join` 대신 `"".join` 사용 | `align-subtitles.py`의 `flush()` 확인 |
| 렌더 OOM | 큰 PNG 이미지 | `sips -Z 1600 -s format jpeg -s formatOptions 80` |
| `pnpm approve-builds` 인터랙티브 프롬프트 | esbuild postinstall | 무시해도 렌더는 작동 |
| 한국어 폰트 미적용 | `load-fonts.ts` import 누락 | `Root.tsx`에서 `import "./load-fonts"` |
| TTS가 숫자를 한자식으로 읽음 | 자연스러운 한국어 발음 누락 | `tts_text`로 한글 풀어쓰기 |
| 챕터 길이가 음성보다 짧음 | sync-durations 누락 | 음성 생성 후 항상 sync |
| 큐 시작 프레임이 음수 또는 비현실적 | `from` 값과 정렬 시 `scene_start_frame` 불일치 | sync-durations 재실행 |

## 10. 다중 챕터로 확장

12개 챕터 같은 대규모 프로젝트의 검증된 구조:

```bash
# 1. 모든 대본을 한 번에 작성
ls scripts/narrations/*.json   # ch01, ch02, ..., ch11, conclusion

# 2. 모든 음성 일괄 생성
python3 scripts/generate-narration.py --all

# 3. 일괄 동기화
python3 scripts/sync-durations.py --all

# 4. 일괄 자막 정렬 (한 번 모델 로드 후 모두 처리 — 효율적)
./.venv-whisper/bin/python scripts/align-subtitles.py --all

# 5. 일괄 렌더
for ch in 1 2 3 4 5 6 7 8 9 10 11; do
  pnpm exec remotion render src/index.ts Chapter$ch out/chapter$ch.mp4 --concurrency=1
done
pnpm exec remotion render src/index.ts Conclusion out/conclusion.mp4 --concurrency=1
```

`Root.tsx`는 모든 Composition을 `compositions` 배열로 매핑해 자동 등록:
```tsx
const compositions = [
  { id: "Chapter1", component: Chapter1, narration: ch01 },
  // ...
];

export const Root = () => (
  <>
    {compositions.map(({ id, component, narration }) => (
      <Composition
        key={id}
        id={id}
        component={component}
        durationInFrames={computeTotalFrames(narration as Narration)}
        fps={(narration as Narration).fps}
        width={1920}
        height={1080}
      />
    ))}
  </>
);
```

## 11. 품질 체크리스트

영상 출시 전 확인:

- [ ] **사실 확인**: 사람 이름·연도·수치 (TTS는 환각하지 않지만 대본을 작성하는 우리가 환각함)
- [ ] **한국어 자연스러움**: 단위명사 앞 숫자, 인용 부호, 어미
- [ ] **음성 들어보기**: 잘못 읽는 부분 → `tts_text` 추가
- [ ] **자막 가독성**: 22자 이하, 4초 이하, 빠르지 않음
- [ ] **자막-음성 동기**: 큐 시작이 발화 시작과 일치 (WhisperX align 확인)
- [ ] **로고 표시**: 우상단에 모든 장면에서 보임
- [ ] **fps·해상도**: ffprobe로 검증
- [ ] **타입체크**: `pnpm exec tsc --noEmit` 통과
- [ ] **음성 길이 ≤ 장면 길이**: sync-durations로 자동 보장됨

## 12. 자산 가이드

### 이미지
- **포지셔닝 이미지**: `public/images/chapters/ch01.jpg` 등 (각 챕터 표지)
- **세로 웹툰**: `public/images/webtoons-v/ch01.jpg` (9:16, 480×853 정도)
- **가로 인포그래픽**: `public/images/webtoons-h/ch01.jpg` (16:9)
- **모든 PNG는 JPEG로 변환** (200~500KB가 이상적):
  ```bash
  sips -Z 1600 -s format jpeg -s formatOptions 80 input.png --out output.jpg
  ```

### 폰트 (한국어)
`@remotion/google-fonts` 사용:
```ts
// src/load-fonts.ts
import { loadFont as loadBody } from "@remotion/google-fonts/GowunDodum";
import { loadFont as loadDisplay } from "@remotion/google-fonts/Gaegu";
loadBody();
loadDisplay();
```

### 컬러 팔레트
`theme.ts`에 5색 + soft 변형:
- `accent` (주황·빨강 계열)
- `mint` (청록)
- `sky` (파랑)
- `sun` (노랑·금색)
- `plum` (자주)

각 챕터에 한 색상을 배정하면 시각적으로 차별화됩니다.

## 13. 장기 운영 팁

### 대본 변경 시 워크플로
1. JSON 텍스트만 수정 (timing은 건드리지 않음)
2. 변경된 챕터의 `public/audio/<ch>/` 폴더 삭제
3. `generate-narration.py <ch>` → 새 음성
4. `sync-durations.py <ch>` → 새 timing
5. `align-subtitles.py <ch>` → 새 자막
6. `pnpm exec remotion render … <ch>.mp4` → 새 영상

### 빈도 높은 변경 자동화
간단한 Makefile/스크립트로 묶을 수 있습니다:
```bash
# rebuild-chapter.sh
ch=$1
rm -rf public/audio/$ch
python3 scripts/generate-narration.py $ch
python3 scripts/sync-durations.py $ch
./.venv-whisper/bin/python scripts/align-subtitles.py $ch
pnpm exec remotion render src/index.ts Chapter${ch#ch} out/chapter${ch#ch}.mp4 --concurrency=1
```

### 비용 관리
- ElevenLabs eleven_v3 한국어: 1자당 약 0.3 캐릭터 차감 (구독제로 월 한도)
- 100자 대본 ≈ 4~6초 음성
- 챕터당 평균 대본 1500자 → 12챕터 약 18,000자
- 처음 생성 후 mp3 캐시되니 같은 챕터를 여러 번 안 만든다면 비용 부담 적음

## 14. 참고: 검증된 대본 패턴

- 짧은 문장 위주 (한 문장 ≤ 60자) — 자막 분할이 자연스러움
- 숫자는 `text`에 디지털, `tts_text`에 한글 (단위명사 앞에서)
- 인용구는 따옴표로 감싸기 — TTS가 강세를 다르게 읽음
- 영문 약어는 한글 음차 또는 풀어쓰기 (`TCP` → `티시피`, `NP-hard` → `엔피하드`)
- 챕터 마지막은 다음 챕터 예고로 — 시청자가 시리즈로 보기 좋음

---

이 가이드대로 따르면 새 한국어 영상 시리즈를 약 다음과 같은 시간 안에 만들 수 있습니다:
- **챕터 1편 (풀커스텀)**: 3~4시간 (대본 + 풀커스텀 React + 검증)
- **챕터 1편 (키트 사용)**: 30~45분 (대본 + 키트 조립 + 검증)
- **재생성 (대본 수정 후)**: 15~20분 (음성 + 정렬 + 렌더)

핵심은 SSOT 원칙과 `tts_text` 분리입니다 — 이 두 가지가 깨지면 자막이 망가지거나 음성이 어색해집니다.
