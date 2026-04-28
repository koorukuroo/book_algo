export type ChapterColor = "accent" | "mint" | "sky" | "sun" | "plum";

export type Chapter = {
  num: number;
  slug: string;
  titleKo: string;
  titleEn: string;
  subtitleKo: string;
  subtitleEn: string;
  oneLiner: string;
  blurb: string;
  hero: string;
  color: ChapterColor;
  emoji: string;
  keyNumber: string;
  keyNumberLabel: string;
};

export const chapters: Chapter[] = [
  {
    num: 1,
    slug: "optimal-stopping",
    titleKo: "최적 멈춤",
    titleEn: "Optimal Stopping",
    subtitleKo: "언제 그만 찾을까",
    subtitleEn: "When to Stop Looking",
    oneLiner: "처음 37%는 보고, 그 이후 더 나은 것을 잡아라",
    blurb:
      "아파트 구하기, 결혼 상대 고르기, 주차 자리 찾기. 모두 같은 문제다. 충분히 봤는가, 더 봐야 하는가? 수학은 정확한 분기점을 알려준다.",
    hero: "/images/chapters/ch01.jpg",
    color: "accent",
    emoji: "🚦",
    keyNumber: "37%",
    keyNumberLabel: "결정적 분기점",
  },
  {
    num: 2,
    slug: "explore-exploit",
    titleKo: "탐색과 활용",
    titleEn: "Explore / Exploit",
    subtitleKo: "최신 vs 최고",
    subtitleEn: "The Latest vs. the Greatest",
    oneLiner: "남은 시간(interval)이 전략을 결정한다",
    blurb:
      "단골 식당과 새로 생긴 가게 사이에서 무엇을 고를까? 다중 슬롯머신 문제는 인생 곡선의 비밀을 푼다.",
    hero: "/images/chapters/ch02.jpg",
    color: "mint",
    emoji: "🎰",
    keyNumber: "0.7029",
    keyNumberLabel: "0-0 머신의 Gittins Index",
  },
  {
    num: 3,
    slug: "sorting",
    titleKo: "정렬",
    titleEn: "Sorting",
    subtitleKo: "질서를 만드는 법",
    subtitleEn: "Making Order",
    oneLiner: "정렬할 가치가 없는 것을 정렬하지 마라",
    blurb:
      "양말, 이메일, 책장, 그리고 사람과 국가까지. 모든 것을 정렬하고 싶지만 사실 그게 함정일 수 있다.",
    hero: "/images/chapters/ch03.jpg",
    color: "sky",
    emoji: "🗂️",
    keyNumber: "O(n log n)",
    keyNumberLabel: "비교 정렬의 한계",
  },
  {
    num: 4,
    slug: "caching",
    titleKo: "캐싱",
    titleEn: "Caching",
    subtitleKo: "잊어버려도 괜찮아",
    subtitleEn: "Forget About It",
    oneLiner: "가장 오랫동안 안 쓴 것을 버려라 (LRU)",
    blurb:
      "기억력 감퇴는 결함이 아니라 도서관이 커진 결과다. 캐시 알고리즘은 옷장 정리부터 노화까지 다시 보게 만든다.",
    hero: "/images/chapters/ch04.jpg",
    color: "sun",
    emoji: "🗄️",
    keyNumber: "LRU",
    keyNumberLabel: "Least Recently Used",
  },
  {
    num: 5,
    slug: "scheduling",
    titleKo: "스케줄링",
    titleEn: "Scheduling",
    subtitleKo: "가장 중요한 일을 먼저",
    subtitleEn: "First Things First",
    oneLiner: "어떤 지표를 최적화할지부터 정하라",
    blurb:
      "마감 vs 완료 개수 vs 합계 시간. 미루기는 게으름이 아닌, 잘못된 문제에 대한 최적해일 수 있다.",
    hero: "/images/chapters/ch05.jpg",
    color: "plum",
    emoji: "⏱️",
    keyNumber: "EDD · SPT",
    keyNumberLabel: "두 가지 황금률",
  },
  {
    num: 6,
    slug: "bayes-rule",
    titleKo: "베이즈 법칙",
    titleEn: "Bayes's Rule",
    subtitleKo: "미래를 예측하기",
    subtitleEn: "Predicting the Future",
    oneLiner: "좋은 예측은 좋은 사전 분포를 요구한다",
    blurb:
      "베를린 장벽은 얼마나 더 갈까? 영화 흥행은? 분포의 모양만 알면 단 한 번의 관측으로도 충분히 좋은 예측이 가능하다.",
    hero: "/images/chapters/ch06.jpg",
    color: "sky",
    emoji: "🔮",
    keyNumber: "(w+1)/(n+2)",
    keyNumberLabel: "Laplace의 후속 법칙",
  },
  {
    num: 7,
    slug: "overfitting",
    titleKo: "과적합",
    titleEn: "Overfitting",
    subtitleKo: "덜 생각해야 할 때",
    subtitleEn: "When to Think Less",
    oneLiner: "더 많이 생각한다고 더 좋은 답이 나오지 않는다",
    blurb:
      "다윈의 결혼 결정 노트, 50:50으로 자기 연금을 운용한 노벨상 경제학자. 단순한 모델이 더 견고하다.",
    hero: "/images/chapters/ch07.jpg",
    color: "mint",
    emoji: "🎯",
    keyNumber: "2 < 9",
    keyNumberLabel: "단순한 게 더 잘 맞는다",
  },
  {
    num: 8,
    slug: "relaxation",
    titleKo: "완화",
    titleEn: "Relaxation",
    subtitleKo: "그냥 풀어주자",
    subtitleEn: "Let It Slide",
    oneLiner: "풀 수 없는 문제는 풀어 헤치고 시작하라",
    blurb:
      "결혼식 좌석 11개 테이블 107명, 가능한 경우의 수는 112자리 숫자. 완벽 대신 충분히 좋은 답을 노려라.",
    hero: "/images/chapters/ch08.jpg",
    color: "plum",
    emoji: "🎈",
    keyNumber: "0.05%",
    keyNumberLabel: "지구 전체 TSP의 근사 오차",
  },
  {
    num: 9,
    slug: "randomness",
    titleKo: "무작위성",
    titleEn: "Randomness",
    subtitleKo: "운에 맡길 때",
    subtitleEn: "When to Leave It to Chance",
    oneLiner: "막혔을 때는 일부러 흔들어라",
    blurb:
      "Monte Carlo 시뮬레이션부터 Simulated Annealing까지. 무작위는 이성의 포기가 아니라 가장 강력한 도구다.",
    hero: "/images/chapters/ch09.jpg",
    color: "accent",
    emoji: "🎲",
    keyNumber: "10⁻²⁴",
    keyNumberLabel: "Miller-Rabin 오류율",
  },
  {
    num: 10,
    slug: "networking",
    titleKo: "네트워킹",
    titleEn: "Networking",
    subtitleKo: "어떻게 연결되는가",
    subtitleEn: "How We Connect",
    oneLiner: "유한한 인내, 무한한 자비",
    blurb:
      "약속을 어기는 친구를 어떻게 대할까? 인터넷 프로토콜이 답을 알려준다. 지수적 백오프, AIMD, 그리고 버퍼블로트.",
    hero: "/images/chapters/ch10.jpg",
    color: "sun",
    emoji: "📡",
    keyNumber: "AIMD",
    keyNumberLabel: "+1, ÷2 톱니파",
  },
  {
    num: 11,
    slug: "game-theory",
    titleKo: "게임이론",
    titleEn: "Game Theory",
    subtitleKo: "타인의 마음",
    subtitleEn: "The Minds of Others",
    oneLiner: "정직이 지배 전략인 게임을 찾아라",
    blurb:
      "상대의 마음을 읽으려 하지 마라. 게임 자체를 바꿔라. 메커니즘 디자인은 죄수의 딜레마를 협력 균형으로 바꾼다.",
    hero: "/images/chapters/ch11.jpg",
    color: "plum",
    emoji: "♟️",
    keyNumber: "4/3",
    keyNumberLabel: "무정부의 가격(도로)",
  },
];

export const conclusionChapter = {
  num: 12,
  slug: "computational-kindness",
  titleKo: "계산적 친절",
  titleEn: "Computational Kindness",
  subtitleKo: "타인의 사고 노동을 줄여주는 것이 진짜 배려",
  subtitleEn: "Conclusion",
  oneLiner: "운은 바라되, 지혜는 추구하라",
  blurb:
    "“편한 시간 알려줘”가 아니라 “화요일 1시 어때?”라고 묻기. 좋은 알고리즘의 본령은 사고 노동의 최소화다.",
  hero: "/images/chapters/conclusion.jpg",
  color: "mint" as ChapterColor,
  emoji: "🤝",
  keyNumber: "—",
  keyNumberLabel: "결론",
};

export const colorClass: Record<ChapterColor, {
  bg: string; bgSoft: string; text: string; border: string; ring: string; gradient: string;
}> = {
  accent: { bg: "bg-[var(--color-accent)]", bgSoft: "bg-[var(--color-accent-soft)]", text: "text-[var(--color-accent)]", border: "border-[var(--color-accent)]", ring: "ring-[var(--color-accent)]", gradient: "from-[var(--color-accent-soft)] to-[var(--color-bg)]" },
  mint:   { bg: "bg-[var(--color-mint)]",   bgSoft: "bg-[var(--color-mint-soft)]",   text: "text-[var(--color-mint)]",   border: "border-[var(--color-mint)]",   ring: "ring-[var(--color-mint)]",   gradient: "from-[var(--color-mint-soft)] to-[var(--color-bg)]" },
  sky:    { bg: "bg-[var(--color-sky)]",    bgSoft: "bg-[var(--color-sky-soft)]",    text: "text-[var(--color-sky)]",    border: "border-[var(--color-sky)]",    ring: "ring-[var(--color-sky)]",    gradient: "from-[var(--color-sky-soft)] to-[var(--color-bg)]" },
  sun:    { bg: "bg-[var(--color-sun)]",    bgSoft: "bg-[var(--color-sun-soft)]",    text: "text-[var(--color-sun)]",    border: "border-[var(--color-sun)]",    ring: "ring-[var(--color-sun)]",    gradient: "from-[var(--color-sun-soft)] to-[var(--color-bg)]" },
  plum:   { bg: "bg-[var(--color-plum)]",   bgSoft: "bg-[var(--color-plum-soft)]",   text: "text-[var(--color-plum)]",   border: "border-[var(--color-plum)]",   ring: "ring-[var(--color-plum)]",   gradient: "from-[var(--color-plum-soft)] to-[var(--color-bg)]" },
};
