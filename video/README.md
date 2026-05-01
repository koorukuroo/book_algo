# Algorithms-to-Live-By 영상 제작 가이드

『알고리즘, 인생을 계산하다』 챕터별 해설 영상을 만드는 파이프라인입니다. Remotion(React 기반 영상 합성) + ElevenLabs(한국어 TTS) + WhisperX(자막 강제정렬) 조합으로, **대본 한 번만 쓰면 음성·자막·영상이 모두 자동으로** 나옵니다.

```
narration-script.json  ──▶  ElevenLabs    ──▶  public/audio/*.mp3
        │                                                │
        └──────────────▶  WhisperX align ◀──────────────┘
                              │
                              ▼
                  public/subtitles.json  ──▶  Remotion render  ──▶  out/chapter1.mp4
```

---

## 1. 사전 준비

| 도구 | 버전 | 용도 |
|---|---|---|
| Node.js | ≥ 20 | Remotion |
| pnpm | ≥ 9 | JS 의존성 |
| Python | 3.12 | TTS / 자막 정렬 |
| ffmpeg | 최신 | Remotion 인코딩 |
| ElevenLabs API key | — | 한국어 TTS |

macOS 기준:

```bash
brew install node pnpm python@3.12 ffmpeg
```

ElevenLabs 키는 **저장소 루트(`book/.env`)** 에 둡니다 (`video/.env` 가 아닙니다):

```bash
# /Users/.../book/.env
ELEVENLABS_API_KEY=sk_xxx...
```

---

## 2. 최초 설치

```bash
cd video

# JS 의존성
pnpm install

# Python 의존성 (전용 venv 권장: PyTorch가 무겁고 시스템 Python을 오염시킬 수 있음)
/opt/homebrew/bin/python3.12 -m venv .venv-whisper
./.venv-whisper/bin/pip install --upgrade pip
./.venv-whisper/bin/pip install elevenlabs python-dotenv faster-whisper whisperx
```

WhisperX는 첫 실행 시 한국어 wav2vec2 모델(`kresnik/wav2vec2-large-xlsr-korean`, ≈1.2GB)을 자동으로 받습니다.

---

## 3. 파이프라인 — 대본 한 줄 고치고 영상 다시 뽑기

### 3-1. 대본 수정

`scripts/narration-script.json` 의 `text` 만 고치면 됩니다. 장면 ID·프레임 구간은 `src/Chapter1.tsx` 의 `SCENES` 상수와 **반드시 일치**해야 합니다 (자막 정렬은 `from` 값을 기준으로 프레임을 계산하기 때문).

```json
{
  "id": "title",
  "from": 0,        // Chapter1.tsx의 SCENES.title.from
  "duration": 300,  // Chapter1.tsx의 SCENES.title.dur
  "text": "알고리즘, 인생을 계산하다. 챕터 1, 최적 멈춤..."
}
```

> ⚠️ `narration-script.json` 의 `from`/`duration` 과 `Chapter1.tsx` 의 `SCENES` 가 어긋나면 자막이 엉뚱한 프레임에 표시됩니다. 둘 중 하나를 고치면 다른 쪽도 같이 고치세요.

### 3-2. TTS 음성 생성 (ElevenLabs)

```bash
./.venv-whisper/bin/python scripts/generate-narration.py
```

- `public/audio/{id}.mp3` 가 이미 있으면 건너뜁니다. 다시 만들고 싶으면 해당 mp3 를 지우세요.
- 음성·모델은 `narration-script.json` 의 `voice_id` / `model_id` 로 정의합니다 (현재: `eleven_v3`).
- 비용: 한국어 한 챕터(≈140초) 기준 약 1만 자 미만.

### 3-3. 자막 강제정렬 (WhisperX)

```bash
./.venv-whisper/bin/python scripts/align-subtitles.py
```

원리:

1. **faster-whisper** 로 빠르게 전사 → 대본과 글자 수 유사도 비교 (`scripts/asr-diff.txt`).
2. **WhisperX `align()`** 에 **정답 대본** 을 입력으로 넣고, wav2vec2 한국어 모델로 단어 단위 강제정렬.
3. 단어 타임스탬프를 22자/4초 단위로 묶어 `public/subtitles.json` 출력.

산출물:

- `public/subtitles.json` — Remotion 이 그대로 읽는 자막 cue 배열 (`{text, fromFrame, toFrame, scene}`).
- `scripts/asr-diff.txt` — Whisper가 들은 텍스트 vs 대본 비교 (이상치 점검용).

CPU에서 6 장면이 약 2~3분 걸립니다. MPS(Apple Silicon GPU)는 wav2vec2 정렬을 지원하지 않으므로 device는 `cpu` 고정.

### 3-4. 미리보기

```bash
pnpm dev   # Remotion Studio (http://localhost:3000)
```

### 3-5. 최종 렌더

```bash
pnpm build   # → out/chapter1.mp4 (1920×1080 / 30fps)
```

---

## 4. 디렉토리 구조

```
video/
├── package.json              # pnpm dev/build/preview
├── remotion.config.ts        # 인코딩 설정 (jpeg / concurrency=1)
├── src/
│   ├── index.ts              # registerRoot
│   ├── Root.tsx              # Composition 정의 (id, fps, 해상도, 총 프레임)
│   ├── Chapter1.tsx          # 장면 타임라인 + Audio 트랙
│   ├── theme.ts              # 색·폰트 토큰
│   ├── load-fonts.ts         # @remotion/google-fonts 로딩
│   └── scenes/
│       ├── TitleScene.tsx
│       ├── HookScene.tsx
│       ├── AlgorithmScene.tsx
│       ├── SimulationScene.tsx
│       ├── StoriesScene.tsx
│       └── OutroScene.tsx
├── scripts/
│   ├── narration-script.json # 대본 (단일 진실의 원천)
│   ├── generate-narration.py # ElevenLabs TTS
│   ├── align-subtitles.py    # WhisperX 강제정렬
│   └── asr-diff.txt          # (생성됨) ASR vs 대본 diff
├── public/
│   ├── audio/                # (생성됨) {id}.mp3
│   ├── subtitles.json        # (생성됨) 자막 cue
│   └── images/               # 로고·웹툰 컷 등 정적 자산
└── out/
    └── chapter1.mp4          # (생성됨) 최종 영상
```

---

## 5. 새 챕터 추가 절차

1. `src/scenes/Chapter2/*.tsx` 생성 (또는 기존 컴포넌트 재사용).
2. `src/Chapter2.tsx` 작성 — 장면 시퀀스 + 오디오 트랙.
3. `src/Root.tsx` 에 `<Composition id="Chapter2" ... />` 추가.
4. `scripts/narration-script.json` 을 챕터별로 분리하거나 `chapter` 키 추가 (현재 챕터 1만 지원).
5. `package.json` 의 `build` 스크립트를 챕터 ID로 분기.

---

## 6. 트러블슈팅

**`whisperx` 가 `OSError: cannot find wav2vec2 model`**
한국어 정렬 모델 다운로드 실패. `~/.cache/huggingface/hub` 에서 부분 다운로드를 지우고 재실행. 회사망에서는 HuggingFace 프록시가 필요할 수 있음.

**자막이 한 글자씩 떨어져 보임**
`align-subtitles.py` 의 `MAX_CUE_CHARS` (기본 22) 를 늘리거나 `group_words()` 의 문장경계 정규식을 조정.

**TTS 가 매번 새로 생성됨**
`public/audio/{id}.mp3` 이 0바이트로 남아있을 때입니다. 빈 파일을 지우고 재실행.

**Remotion 빌드가 OOM**
`remotion.config.ts` 의 `Config.setConcurrency(1)` 을 유지하세요. 1080p 영상은 코어당 메모리를 많이 씁니다.

**대본을 고쳤는데 영상에 반영이 안 됨**
1. mp3 삭제 → `generate-narration.py` 재실행
2. `align-subtitles.py` 재실행 (subtitles.json 갱신)
3. `pnpm build` (Remotion은 캐시를 자동으로 무효화하지만, 안 되면 `out/` 비우고 재빌드)

---

## 7. 비용·시간 목격치 (챕터 1, 143초 기준)

| 단계 | 시간 | 비용 |
|---|---|---|
| ElevenLabs TTS | ≈30초 | 약 $0.20 (eleven_v3 ko, ~700자) |
| WhisperX 정렬 | ≈3분 (CPU) | 무료 |
| Remotion 렌더 | ≈8분 (M2 Pro, 1920×1080) | 무료 |
