# Algorithms to Live By - 종합 개요

## 책 정보
- **원제**: Algorithms to Live By: The Computer Science of Human Decisions
- **저자**: Brian Christian, Tom Griffiths
- **출간**: 2016년 (William Collins / Henry Holt and Company)
- **분량**: 454페이지 (영문 PDF)

## 저자 소개
- **Brian Christian**: 컴퓨터과학·철학을 학부 전공, 영문학 대학원 수료. 세 분야의 교차점에서 활동.
- **Tom Griffiths**: 심리학·통계학 전공, UC Berkeley 교수. 인간 인지와 계산의 관계 연구.

## 책의 핵심 주제
컴퓨터 과학이 50년 이상 씨름해 온 **알고리즘들**이 인간이 매일 마주하는 일상의 의사결정 문제와 본질적으로 같은 구조를 가진다는 통찰. 따라서 컴퓨터 과학의 검증된 해법은 곧 인간 삶의 지혜로 이식 가능하다.

이 책이 새로운 점:
1. 행동경제학이 인간을 "비합리적이고 결함 많은 존재"로 보던 시각을 뒤집는다.
2. 인간의 직관·휴리스틱이 사실 어려운 계산 문제에 대한 합리적 적응임을 보여준다.
3. 결과가 아닌 **과정**의 합리성에 주목하는 "계산적 스토아주의" 윤리를 제시한다.
4. 마지막에는 **계산적 친절(Computational Kindness)**이라는 새로운 미덕을 제안한다.

## 11개 챕터 한 줄 요약

| Ch | 영문제목 | 한글제목 | 한 줄 핵심 |
|---|---|---|---|
| 1 | Optimal Stopping | 최적 멈춤 | 처음 37%를 보고 그 이후 더 나은 것을 잡아라 |
| 2 | Explore/Exploit | 탐색과 활용 | 남은 시간(interval)이 전략을 결정한다 |
| 3 | Sorting | 정렬 | 정렬할 가치가 없는 것을 정렬하지 마라 |
| 4 | Caching | 캐싱 | 가장 오랫동안 안 쓴 것을 버려라 (LRU) |
| 5 | Scheduling | 스케줄링 | 어떤 지표를 최적화할지부터 정하라 |
| 6 | Bayes's Rule | 베이즈 법칙 | 좋은 예측은 좋은 사전 분포를 요구한다 |
| 7 | Overfitting | 과적합 | 더 많이 생각한다고 더 좋은 답이 나오지 않는다 |
| 8 | Relaxation | 완화 | 풀 수 없는 문제는 풀어 헤치고 시작하라 |
| 9 | Randomness | 무작위성 | 막혔을 때는 일부러 흔들어라 |
| 10 | Networking | 네트워킹 | 유한한 인내, 무한한 자비 |
| 11 | Game Theory | 게임이론 | 정직이 지배 전략인 게임을 찾아라 |
| Conclusion | Computational Kindness | 계산적 친절 | 타인의 사고 노동을 줄여주는 것이 진짜 배려다 |

## 책 전체를 관통하는 5가지 메타 원칙

1. **Process over Outcome (과정 > 결과)**: 좋은 알고리즘을 따랐다면, 결과가 나쁘더라도 자책하지 마라.
2. **Interval matters (간격이 핵심)**: 같은 결정도 남은 시간이 짧은가 긴가에 따라 답이 다르다.
3. **Less can be more (덜 = 더 많이)**: 단순한 모델, 짧은 생각, 적은 정보가 종종 더 견고하다.
4. **Embrace uncertainty (불확실성 수용)**: 무작위성·근사·완화는 약점이 아니라 도구다.
5. **Change the game (게임을 바꿔라)**: 전략을 바꾸기 어렵다면 규칙 자체를 바꿔라.

## 책 전체에서 반복되는 핵심 인물

- **Michael Trick** (카네기 멜런): 1장 청혼 실패, 3장 MLB 스케줄, 8장 NCAA 라그랑지 완화 — 책의 마스코트.
- **Merrill Flood** (RAND): 1장 비서 문제, 8장 외판원 문제, 결론 에피그래프 — "기계가 우리의 지적 부담을 덜어주면..."
- **Eugene Lawler** (UC Berkeley): 5장 스케줄링·선례 제약의 마스터, 1994년 사후 ACM 인도주의상 명명.
- **Donald Knuth**: 5장 일괄처리 라이프스타일.
- **Stanislaw Ulam**: 9장 솔리테어와 Monte Carlo의 시작.

## 일상에 즉시 적용할 수 있는 7가지 실천

1. **결정의 37% 시점**까지는 데이터 수집, 그 이후 더 나은 것을 즉시 잡기.
2. **할 일 목록의 가중치**를 명시적으로 설정하기 (마감 vs 개수 vs 합계).
3. **이메일 폴더 정리**는 시간 낭비 — 검색 기능을 신뢰하기.
4. **약속 잡을 때** "편한 시간 알려줘"가 아니라 "화요일 1시 어때?"라고 두세 옵션 제시하기.
5. **휴가는 무조건 쓰기** (의무 최소 휴가가 있는 회사라면 활용, 없다면 본인이 의무화).
6. **노화로 인한 기억력 저하**를 자책하지 않기 — 도서관이 커진 결과일 뿐.
7. **새 도시·새 직장 초기**엔 explore, 익숙해진 후엔 exploit으로 자연스럽게 옮기기.

## 웹사이트 구성 제안

각 챕터를 다음 구조로 만드는 것을 추천:
- **훅(Hook)**: 친숙한 일상 상황 제시 (예: 집 구하기)
- **이름 붙이기**: 이 문제의 컴퓨터 과학 명칭 ("최적 멈춤")
- **알고리즘**: 그림과 함께 단계별 설명 ("37% 규칙")
- **실험·일화**: 케플러의 결혼, Trick의 청혼 등 스토리텔링
- **숫자**: 기억하기 쉬운 수치 (37%, 1/e)
- **나의 인생에 적용**: 인터랙티브 계산기/체크리스트
- **명언 카드**: 공유할 수 있는 인상적 문장

## 노트 파일 안내
- `chapters-1-3.md`: Optimal Stopping, Explore/Exploit, Sorting
- `chapters-4-6.md`: Caching, Scheduling, Bayes's Rule
- `chapters-7-9.md`: Overfitting, Relaxation, Randomness
- `chapters-10-11-conclusion.md`: Networking, Game Theory, Computational Kindness
