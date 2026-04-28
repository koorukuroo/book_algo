# Algorithms to Live By - 챕터 7-9 상세 분석

## 챕터 7: Overfitting / 과적합 — 덜 생각해야 할 때

### 핵심 메시지
"더 많이 생각하고 더 많은 요인을 고려하는 것이 항상 더 나은 결정을 낳지는 않는다"는 것이 이 챕터의 핵심이다. 머신러닝의 핵심 개념인 '과적합(overfitting)'은 모델이 가진 데이터에 너무 정밀하게 맞추다 보니 오히려 새로운 데이터에 대한 예측력을 잃는 현상을 말한다. 인생의 모든 결정은 사실상 일종의 예측이며, 다양한 형태의 노이즈와 측정 오차가 존재하기 때문에 단순한 모델이 더 견고할 때가 많다. 따라서 때로는 직관·경험·휴리스틱처럼 '덜 생각하는 것'이 합리적 선택일 수 있다.

### 다루는 주요 알고리즘/개념
- **Overfitting(과적합)**: 모델 복잡도가 높아질수록 학습 데이터를 완벽히 맞출 수 있지만, 노이즈까지 학습해 새로운 데이터의 예측은 오히려 나빠진다. 9개 요인 모델은 결혼 만족도 데이터의 모든 점을 통과하지만, 결혼 직전 '비참함', 첫 몇 달 후 '급격한 행복도 상승', 10년 후 '절벽 같은 추락' 같은 비현실적 예측을 내놓는다.
- **Cross-Validation(교차 검증)**: 데이터의 일부를 일부러 빼두고('홀드아웃'), 나머지로만 학습한 뒤 빼둔 데이터로 검증한다. 또한 다른 방식의 평가(예: 객관식 시험 외에 에세이·구술시험)를 병행해 '시험을 위한 공부'(teaching to the test)를 잡아낼 수 있다.
- **Regularization(정규화) — Lasso**: 1996년 생물통계학자 Robert Tibshirani가 발견한 알고리즘. 모델의 복잡도(요인 가중치 절댓값의 합)를 페널티로 추가해, 영향이 작은 요인들의 가중치를 0으로 끌어내려 자동으로 단순한 모델로 압축한다.
- **Occam's Razor(오컴의 면도날)**: "다른 조건이 같다면 가장 단순한 가설이 옳을 가능성이 크다." 1960년대 러시아 수학자 Andrey Tikhonov는 이 원칙을 수학적으로 정형화해 복잡도 페널티를 도입했다.
- **Early Stopping(조기 종료)**: 모델이 너무 복잡해지기 전에 학습을 일찍 멈추는 기법. 가장 중요한 요인부터 차례로 추가하다가 적절한 시점에 멈추면 과적합을 막을 수 있다.
- **Heuristics(휴리스틱)**: 단순한 의사결정 규칙. 심리학자 Gerd Gigerenzer와 Henry Brighton는 "정보가 적을 때, 단순한 휴리스틱이 더 정확한 결정을 만든다"고 주장한다.

### 흥미로운 사례/실험
- **다윈의 결혼 결정(1838)**: 찰스 다윈은 사촌 Emma Wedgwood에게 청혼할지 고민하며 종이에 찬반 항목을 적었다. 찬성: 자녀, 동반자, "음악과 여성 수다의 매력". 반대: "끔찍한 시간 손실", 친척 방문의 부담, 책 살 돈이 줄어듦. 결국 "결혼하라—결혼하라—결혼하라 Q.E.D."라고 적었다. 책의 흥미로운 디테일은, 다윈이 일기장 한 페이지 끝에서 결정을 내렸다는 것 — '페이지에 정규화'한 셈이다.
- **벤자민 프랭클린의 'Moral Algebra'**: 종이를 반으로 나누어 찬반을 적고, 같은 무게의 항목들을 상쇄해가며 결론을 도출하는 방식. 다윈보다 한 세기 앞선다.
- **독일 결혼 만족도 연구**: 결혼 후 10년간의 행복도 데이터를 1요인, 2요인, 9요인 모델로 피팅한 결과, 9요인 모델은 모든 점을 완벽히 맞추지만 미래 예측은 엉터리다. 2요인 모델이 '신혼 후 회복기' 패턴을 가장 잘 예측했다.
- **Harry Markowitz의 본인 연금 운용**: 1990년 노벨 경제학상 수상자(현대 포트폴리오 이론 창시자) 본인이 정작 자기 연금은 주식과 채권에 50:50으로 분배했다. 이유: "주식이 폭락했을 때 모두 주식이었거나, 폭등했을 때 한 푼도 없었을 때의 후회를 최소화하고 싶었다."
- **펜싱 종목의 변화(저자 Tom의 사례)**: 전자 점수계 도입 이후 선수들이 칼끝 버튼을 살짝 휘둘러 점수를 따는 'flick' 기술에 과적합되어, 실제 결투에서는 쓸모없는 동작을 한다.
- **법 집행관의 'Training Scars'**: 사격 훈련에서 탄피를 주머니에 넣는 습관이 굳어 실제 총격전 중에도 탄피를 줍다 사망한 경관들 사례. FBI는 두 발 쏘고 자동으로 권총집에 넣는 훈련 패턴 때문에 표적 명중 여부와 무관하게 권총을 집어넣는 사례를 발견하고 훈련을 바꿨다. 한 경관은 가해자 손에서 총을 빼앗은 후, 훈련에서 그랬던 것처럼 자동으로 다시 돌려주기도 했다.
- **Ridgway의 'Dysfunctional Consequences of Performance Measurements'(1950년대)**: 직업소개소 직원들이 면담 횟수로 평가받자 빨리 처리하기에만 집중. 연방 수사관은 월말에 쉬운 사건만 골라 처리. 공장 감독은 생산 지표만 챙기다 정비를 소홀히 해 후일 사고로 이어짐.
- **Tom의 첫 강의 경험**: 첫 학기에 강의 1시간당 10시간 이상 준비. 두 번째 학기엔 시간이 부족해 걱정했지만 학생들 평가는 더 좋았다. 본인 취향을 학생 취향의 대리 지표(proxy)로 삼아 과적합한 것이 원인.
- **Avinash Kaushik(구글)**의 경고: "친구가 페이지뷰로 측정하지 못하게 하라. 절대로." (CPM 광고 비즈니스가 사용자 경험을 망친 사례)

### 핵심 숫자/공식
- 인간 두뇌는 하루 총 칼로리의 약 **1/5(20%)**를 소비 — 복잡도에 대한 진화적 페널티의 증거
- 9요인 모델 vs 2요인 모델 — 2요인이 일반화 성능 우위
- Tom의 첫 강의 준비: **수업 1시간당 10시간 이상** (과적합의 결과)
- 1996년 Lasso 발견 / 1960년대 Tikhonov의 정규화 / 1990년 Markowitz 노벨상
- 식품 트렌드 사례: **Vita Coco 코코넛 워터 매출 2004년 이후 300배 증가**, **케일 시장 2013년 한 해에만 40% 성장**

### 실생활 적용 시나리오
- **결혼/이직/큰 결정**: 처음 떠오르는 2~3개 요인이 본질이고, 그 이후는 '시간 낭비 + 과적합'일 가능성이 크다. 다윈처럼 한 페이지 안에서 끝내라.
- **자산 운용**: 시장 정보에 대한 확신이 낮을 때는 50:50 같은 단순 분배가 합리적이다.
- **다이어트/운동**: 미각은 영양의 대리 지표일 뿐이므로 가공식품에 미각을 과적합시키지 말고, 체지방률·근육량 같은 외형 지표에만 과적합한 스테로이드 사용을 경계하라.
- **업무/회사 KPI**: 측정 지표 자체가 목적이 되면 본질을 놓친다. Steve Jobs: "회사는 CEO가 측정하기로 한 것을 그대로 만든다."
- **기획/디자인**: Jason Fried와 David Heinemeier Hansson은 초기 브레인스토밍 시 일부러 굵은 샤피 마커로 그린다. 펜이 너무 정밀하면 아직 신경 쓰지 않아도 될 디테일에 매달리게 되기 때문.

### 인용할 만한 명언/문장
- "Marry—Marry—Marry Q.E.D." — Charles Darwin / "결혼하라—결혼하라—결혼하라. 이상 증명 끝."
- "If you can't explain it simply, you don't understand it well enough." / "단순하게 설명할 수 없다면, 충분히 이해한 것이 아니다."
- "Friends don't let friends measure Page Views. Ever." — Avinash Kaushik / "친구가 페이지뷰로 측정하게 두지 마라. 절대로."
- "What would happen if we started from the premise that we can't measure what matters and go from there? Then instead of measurement we'd have to use something very scary: it's called judgment." — Henry Mintzberg / "정작 중요한 것은 측정할 수 없다는 전제에서 출발하면, 우리는 측정 대신 '판단'이라는 무서운 것을 써야 한다."
- "Going with our first instinct can be the rational solution." / "첫 직관을 따르는 것이 합리적 해법일 수 있다."

### 챕터에서 사용된 비유/인사이트
- **데이터 우상숭배(Idolatry of Data)**: 성서가 우상숭배를 경계한 것처럼, 측정 가능한 데이터를 진짜 가치보다 더 숭배해서는 안 된다. 청동 뱀이 신앙의 대상이 된 사건처럼, 우리는 진짜 신호 대신 청동 뱀(대리 지표)에 절하고 있다.
- **Lasso = 자연의 페널티**: 신진대사·시간·기억·언어가 모두 자연적 Lasso로 작동한다. 두뇌도 동시에 발화하는 뉴런 수를 줄여 복잡도를 누른다.
- **굵은 샤피 마커 비유**: 초기 단계에서는 일부러 해상도를 낮춰야 큰 그림이 보인다.
- **진화적 짐(decussation, 귓속뼈의 재사용)**: 몸을 지나친 최적화로부터 보호하는 '제약'으로 작용한다 — 인간의 좌우 신경 교차나 망치뼈·모루뼈·등자뼈가 그 예.
- **Early Stopping = 사상적 보수주의**: 트렌드에 휩쓸리지 말고, 'jump *toward* the bandwagon, but not necessarily *on* it'(밴드웨건을 향해 뛰되 꼭 올라타진 말라).

---

## 챕터 8: Relaxation / 완화 — 그냥 풀어주자

### 핵심 메시지
어떤 문제는 본질적으로 '완벽한 답'을 구할 수 없는, 계산적으로 다루기 힘든(intractable) 문제다. 이런 문제 앞에서 컴퓨터과학자가 가르쳐주는 지혜는 "포기하지도, 영원히 매달리지도 말고, 문제를 '완화(relax)'하라"는 것이다. 제약을 임시로 풀고, 이산을 연속으로 바꾸고, 불가능을 단지 '비싼 일'로 강등시켜라. 완벽 대신 충분히 좋은 답에 만족할 때, 비로소 진전이 시작된다.

### 다루는 주요 알고리즘/개념
- **Constrained Optimization(제약 최적화)**: 규칙과 점수 체계가 주어졌을 때 최적의 변수 배치를 찾는 문제.
- **Traveling Salesman Problem(외판원 문제, TSP)**: 모든 도시를 한 번씩 방문하는 최단 경로 찾기. 도시 수가 늘면 가능한 경로는 O(n!) — '카드를 공중에 던져 정렬되길 기다리는' 수준.
- **Cobham–Edmonds Thesis(1960년대)**: 다항식 시간(O(n²), O(n³) 등) 안에 풀리면 '효율적', 풀이가 불가능하면 'intractable'. 컴퓨터과학의 핵심 통찰 — "어떤 문제는 그냥… 어렵다."
- **Constraint Relaxation(제약 완화)**: 제약 일부를 제거해 더 풀기 쉬운 문제로 만든 뒤 진전을 이룬 다음 다시 현실로 가져오는 기법. 외판원 문제에서 같은 도시를 두 번 방문해도 되게 풀면 'minimum spanning tree(최소 신장 트리)'가 되고, 이는 진짜 답의 하한선(lower bound)을 제공한다. 지구상 모든 도시를 도는 거대 TSP도 이 방법으로 최적해의 0.05% 이내까지 접근했다.
- **Continuous Relaxation(연속 완화)**: 이산(예/아니오) 선택을 분수·확률로 바꾼다. '편지를 1/4통, 또 다른 사람에게 2/3통 보낸다' 같은 답을 얻은 뒤 반올림하거나 동전 던지기로 정수화한다. 초대 문제에서 이 방법의 결과는 최적해의 최대 2배 안에 들어옴이 수학적으로 보장된다.
- **Lagrangian Relaxation(라그랑지 완화)**: 일부 제약을 점수 시스템에 흡수시켜 '불가능'을 '비싼 페널티'로 강등시킨다. "Or else what?" 정신. 18세기 프랑스 수학자 Joseph-Louis Lagrange의 이름을 땄다.
- **Knapsack Problem(배낭 문제)**: 한정된 용량에 어떤 물건을 담을지 결정하는 문제. 록밴드의 셋리스트 결정도 이에 해당하며, 통금시간을 살짝 어기고 벌금을 내는 것이 합리적일 수 있다.

### 흥미로운 사례/실험
- **Meghan Bellows의 결혼식 좌석 배치(2010)**: 프린스턴 화학공학 박사과정생인 그녀는 자신의 단백질 아미노산 배치 연구가 결혼식 좌석 배치 문제와 1:1로 대응됨을 깨달았다. 모르는 사람=0, 아는 사람=1, 커플=50, 신부 여동생의 'wishlist'=10으로 점수화했다. 107명, 11개 테이블, 가능한 경우의 수는 11^107 — 112자리 숫자로, 2,000억 googol(관측 가능한 우주의 원자 수의 80자리보다 훨씬 큼). 프린스턴 컴퓨터 클러스터로 36시간 돌렸지만 진짜 최적해는 못 찾았다. 그래도 컴퓨터는 '신부 부모를 가족 테이블에서 빼서 오랜 친구들과 같이 앉히자'는 사람이 떠올리지 못한 안을 제시했고, 신부 어머니가 살짝 손본 뒤 채택됐다.
- **Abraham Lincoln's Eighth Judicial Circuit**: 16년간 봄가을마다 14개 카운티를 도는 순회 변호사. 이는 사실상 19세기판 TSP였다.
- **Karl Menger(1930)**가 처음 'postal messenger problem'으로 제기, **Hassler Whitney(1934)** 프린스턴 강연, **Merrill Flood**가 RAND에서 확산, 'traveling salesman problem'이라는 명칭은 **Julia Robinson(1949)** 논문에 처음 등장.
- **Jack Edmonds의 예언(1960년대)**: "외판원 문제에 대한 좋은 알고리즘은 없다고 추측한다." — 후일 거의 사실로 확인됨.
- **Richard Karp(1972, 버클리)**: TSP가 NP-class 문제와 연결됨을 증명.
- **Michael Trick의 MLB 스케줄링**: 카네기 멜런의 Trick은 메이저리그 야구와 NCAA 스케줄을 매년 짠다. 연속 완화는 쓸 수 없고(반쪽 경기는 의미가 없으니), 라그랑지 완화로 일부 제약을 페널티로 바꾼다. 흥미로운 일화: 야구계 사람들이 "양키스와 메츠는 절대 같은 날 홈경기 안 한다"고 믿지만, 실제로는 시즌당 3~6번 같은 날 홈경기를 한다. 또 NCAA 농구는 TV 방송사가 1년 전에 'A 게임'(Duke vs UNC 같은)과 'B 게임'을 정해놓는데, A 게임 두 개가 동시에 열리면 시청자가 분산되므로 같은 시간에 안 잡히게 해야 한다.
- **Voltaire**의 격언: "완벽은 좋은 것의 적이다(Le mieux est l'ennemi du bien)."
- **Brian의 어머니**: 어린 Brian이 숙제와 잡일 불평을 늘어놓자 어머니는 "사실 너는 아무것도 *해야 할* 필요는 없어. 선생님 말 안 들어도 되고, 내 말도, 법도 안 지켜도 돼. 다만 그에 따른 결과를 받아들일지 결정하면 돼." — 라그랑지 완화의 인생 버전.
- **Christopher Booker의 비판**: 무의식적 희망사항에 따라 행동하면 '꿈→좌절→악몽→폭발' 단계로 무너진다. 그러나 컴퓨터과학에서 완화는 '의식적인 희망사항'이라는 점에서 다르다.

### 핵심 숫자/공식
- TSP의 가능한 경로 수: **O(n!)** — 도시 10개면 약 360만 경로
- Bellows의 결혼식 경우의 수: **11^107** ≈ 2,000억 googol (112자리 수)
- 컴퓨터로 36시간 돌려도 못 찾는 진짜 최적해 — 그러나 충분히 좋은 답은 가능
- 지구 전체 도시 TSP는 **최적해의 0.05% 이내**까지 근사 해결됨
- 초대장 연속 완화 + 반올림: **최적해의 최대 2배** 메일 발송 보장

### 실생활 적용 시나리오
- **인생 계획 질문**: "두렵지 않다면 무엇을 할 것인가?", "복권에 당첨되면?", "모든 직업의 보수가 같다면?" — 모두 Constraint Relaxation의 일상 버전. 이상화된 세계에서 시작점을 찾고 현실로 환원하라.
- **일정 관리**: '도시 사이를 순간이동할 수 있다면 하루 1시간 미팅 8개가 한계'라는 식으로 상한선부터 잡아라.
- **셋리스트/북투어/배낭여행**: 통금이나 벌금을 감수할 수 있다면 그것이 합리적일 때가 있다. 무리 없이 시간 안에 맞추려고 가치 있는 항목을 잘라내지 마라.
- **소방서·공중보건**: 분수 vaccine·반쪽 소방차로 푼 다음, 0.5 이상이면 실제 배치 또는 동전 던지기로 정수화 — 최적해 두 배 이내 보장.

### 인용할 만한 명언/문장
- "The perfect is the enemy of the good." — Voltaire / "완벽은 좋은 것의 적이다."
- "When the problem is hard, it doesn't mean that you can forget about it, it means that it's just in a different status. It's a serious enemy, but you still have to fight it." — Jan Karel Lenstra / "문제가 어렵다는 것이 무시해도 된다는 뜻은 아니다. 다만 다른 신분의 적일 뿐. 여전히 싸워야 한다."
- "Vizzini: Inconceivable! Inigo Montoya: You keep using that word. I do not think it means what you think it means." — *The Princess Bride* / 라그랑지 완화의 비유: '불가능'은 사실 그저 '비싼 일'일 수 있다.
- "How close can you get?" — Michael Trick / "얼마나 가까이 갈 수 있는가?"
- "Technically, you don't have to do anything." — Brian의 어머니

### 챕터에서 사용된 비유/인사이트
- **Relaxation = 의식적 wishful thinking**: Booker가 비판한 '무의식적 희망사항'이 무너지는 4단계와 달리, 컴퓨터과학적 완화는 의식적이고 다시 현실과 화해되도록 설계된 사고이기에 진전을 만든다.
- **Minimum Spanning Tree = 환상의 하한선**: 같은 도시 두 번 방문 가능한 환상의 답이지만, 진짜 최적해는 이보다 짧을 수 없으므로 진실의 경계를 그려준다.
- **Or else what? 정신**: 모든 '꼭 해야 한다'는 사실 페널티 함수의 단단한 표현일 뿐이다. 라그랑지는 그 표현을 부드럽게 만든다.
- **Knapsack as life**: 인생도 한정된 시간·에너지의 배낭. 완벽히 채울 순 없지만, 약간의 페널티를 받아들이면 더 풍요롭게 채울 수 있다.

---

## 챕터 9: Randomness / 무작위성 — 운에 맡길 때

### 핵심 메시지
무작위성은 이성을 포기하는 것이 아니라, 가장 어려운 문제 앞에서 의도적이고 효과적인 도구가 될 수 있다. 결정론적 알고리즘이 풀 수 없는 문제를 무작위 알고리즘은 짧은 시간에 좋은 근사해로 해결한다. 무작위 표본 추출, 무작위 확인, 무작위 점프(jitter), 시뮬레이티드 어닐링은 모두 인간의 의사결정과 창의성에도 그대로 적용된다. 핵심은 "언제, 얼마나, 어떻게" 무작위성을 쓸지 아는 것이다.

### 다루는 주요 알고리즘/개념
- **Sampling(표본 추출)**: 복잡한 양을 직접 계산하기 어려울 때 무작위 표본으로 추정. 1777년 Buffon이 바늘과 줄 무늬 종이에서 시작하여, 1812년 Laplace가 π를 바늘 던지기로 추정할 수 있다고 제안.
- **Monte Carlo Method**: Stanislaw Ulam이 솔리테어를 두며 떠올린 아이디어. 가능성의 공간을 모두 분석하지 말고, 직접 게임을 돌려보고 성공 비율을 보라. Nicholas Metropolis가 모나코의 카지노 이름을 따 명명. 핵분열 연쇄반응 계산에도 쓰였다.
- **Miller-Rabin Primality Test(밀러-라빈 소수성 검사)**: Gary Miller가 박사 논문에서 발견한 식들 — n이 소수면 어떤 x를 넣어도 참, 비소수면 일부 x가 거짓('witness'). 문제는 false positive. Michael Rabin은 n이 비소수일 때 false positive를 주는 x는 전체의 1/4 이하임을 증명. 따라서 무작위 x를 10번 검사하면 오류 확률 ≤ 1/4¹⁰ < 1/100만, 15번이면 < 1/10억. 현대 암호 시스템은 **40번 적용**해 false positive율을 **10⁻²⁴ 이하**로 만든다.
- **Polynomial Identity Testing(다항식 항등 검사)**: 두 다항식이 같은지 직접 곱해서 비교하는 대신 무작위 x 값을 대입. 무작위 입력 여러 개에서 같은 값이 나오면 항등일 가능성이 매우 높다. 이는 무작위 외에 알려진 효율적 결정론적 방법이 없는 문제.
- **Bloom Filter**: Burton H. Bloom이 만든 확률적 자료구조. URL 같은 거대 집합의 멤버십 검사에서 1~2% 오류를 허용하면 시간·공간을 극적으로 절약. Google 같은 검색엔진의 URL 중복 검사, 악성 사이트 차단, 비트코인 등에 사용. Michael Mitzenmacher: "시간·공간·오류확률 3차원 trade-off."
- **Hill Climbing(언덕 오르기)**: 현재 해를 약간씩 변경해보며 더 나은 방향으로 이동. 그러나 'local maximum'(국소 최대)에 갇힐 위험.
- **Jitter / Random-Restart Hill Climbing(샷건 힐 클라이밍)**: 갇히면 작은 무작위 변화를 주거나, 아예 처음부터 다시 시작.
- **Metropolis Algorithm**: 매 단계에서 무작위로 가끔 *나쁜* 변화도 받아들인다. 나쁠수록 채택 확률은 낮다.
- **Simulated Annealing(시뮬레이티드 어닐링)**: Scott Kirkpatrick(IBM)이 1980년대 초 발견. 처음에는 '뜨겁게'(완전 무작위 시작) → 점점 '냉각'(채택 임계값을 점점 높임) → 마지막에 hill climbing으로 수렴. *Science* 논문 인용 횟수 32,000회.

### 흥미로운 사례/실험
- **Stanislaw Ulam과 솔리테어**: 폴란드 출신, 맨해튼 프로젝트 수학자. 뇌염에 걸려 응급 뇌수술 후 회복 중 솔리테어를 두며 "이긴 게임의 비율은?"이라는 질문에서 Monte Carlo가 탄생. 가능한 셔플은 80 unvigintillion(80자리 수). Ulam의 통찰: "충분히 복잡한 문제에서는, 실제 표본 추출이 모든 경우 분석보다 낫다."
- **Michael Rabin과 한밤중 전화(1975)**: MIT 안식년 중 Rabin은 Vaughan Pratt이 Hanukkah 파티 중 자정에 전화로 "2^400 − 593이 소수다", 그리고 당시 가장 큰 쌍둥이 소수를 발견했다고 알린다. "내 머리카락이 곤두섰다. 믿을 수 없었다." Rabin은 1931년 독일 Breslau(현 폴란드 Wrocław) 출생, 랍비 가문 후예지만 수학에 매료되어 프린스턴 박사. 후일 비결정론 컴퓨터과학 공로로 튜링상.
- **AKS 결정론적 소수성 검사(2002)**: 인도공대의 Manindra Agrawal, Neeraj Kayal, Nitin Saxena가 결정론적 다항시간 알고리즘 발견. 그러나 실무에서는 여전히 더 빠른 Miller-Rabin이 표준.
- **John Rawls의 '무지의 베일'**: 정의를 평가하는 사고실험. 컴퓨터과학자 Scott Aaronson은 "무지의 베일에서 정보를 모으는 것조차 계산복잡도 문제이며, Monte Carlo 기반 표본 추출이 답일 수 있다"고 제안. Le Guin의 'Omelas' 이야기 — 하나의 어린아이를 비참함에 가둔 채 번영하는 도시 — 도 평균과 분포의 차이를 보여준다.
- **GiveDirectly의 매주 수요일 인터뷰**: 케냐·우간다 빈곤층에 무조건 현금을 지원하는 자선단체. 다른 단체처럼 '성공 스토리'만 골라 보여주지 않고, 매주 수요일 무작위로 한 명을 골라 인터뷰 그대로 공개. 첫 인터뷰는 양철 지붕을 산 Mary의 이야기.
- **Salvador Luria의 슬롯머신(1943)**: 노벨상 수상자가 된 그가 인디애나 대학 컨트리클럽 댄스에서 동료의 슬롯머신을 보다가 "잭팟!"을 보고, 박테리아 항바이러스 내성이 (1) 바이러스 노출에 대한 반응이냐, (2) 무작위 돌연변이의 결과냐를 가릴 실험을 떠올렸다. 만약 (2)라면 가계도 위쪽에서 돌연변이가 일어났을 때 그 후손 전체가 내성을 갖는 '잭팟' 패턴이 나와야 한다. 실험 결과 — Jackpot. 진화의 무작위성과 발견의 무작위성이 동시에 작동한 사례.
- **Scott Kirkpatrick(IBM) vs '암호 같은 구루'**: IBM 칩 회로 배치를 가장 잘 짜던 어느 베테랑은 "방법을 도무지 알려주지 않았다." Kirkpatrick과 Dan Gelatt는 어닐링 비유로 시뮬레이티드 어닐링을 만들어 그를 능가했고, 비밀로 하는 대신 *Science*에 발표.
- **Brian Eno와 Peter Schmidt의 'Oblique Strategies'**: 창작 막힘을 푸는 무작위 카드 덱. "스튜디오 한가운데 있을 때 가장 명백한 것을 잊는다. 카드는 프레임 밖으로 던져준다."
- **William James(1880, *Atlantic Monthly*)**: "Great Men, Great Thoughts, and the Environment" 논문에서 무작위 변이와 환경 선택이 진화·창의성·사회 진보의 공통 메커니즘이라고 주장.
- **Donald Campbell(1960)**: "Blind Variation and Selective Retention in Creative Thought". 모든 진정한 지식 증가는 'blind variation + selective retention'이다. Mach: "Newton, Mozart, Wagner의 영감도 사실은 마음속 무작위 생성을 옳은 것만 골라 남긴 결과."
- **Tom의 Wikipedia 'Random article' 홈페이지**: 매번 새 창을 열 때마다 무작위 위키 문서. 칠레군의 칼, 포르투갈어로 "존재하지 않을 가능성이 큰 무엇에 대한 막연하고 끊임없는 갈망"을 뜻하는 단어 등을 알게 됐다. 또 '무작위'가 어떻게 보이는지에 대한 직관도 길러진다.
- **The Dice Man(1971)**: Luke Rhinehart(본명 George Cockcroft)의 컬트 소설. 모든 결정을 주사위로 한다. 작가 본인도 한때 가족과 지중해 보트에서 'dicing' 생활을 하다가, 어닐링이 식어 뉴욕 주의 한 호수에 정착. 80대가 된 그는 *가디언*에 말했다: "행복한 곳에 도착했으면 더 흔드는 건 어리석다."

### 핵심 숫자/공식
- 솔리테어 가능 셔플 수: **80 unvigintillion**(80자리)
- Miller-Rabin false positive 확률: **≤ (1/4)^k**, k=검사 횟수
- 현대 암호 표준: **k=40 → 오류율 < 10⁻²⁴**
- Bloom Filter 허용 오류율: **1~2%**
- Buffon 바늘: 짧은 바늘이 줄에 걸칠 확률 = **(2/π) × (바늘 길이/줄 간격)**
- 카지노 'Monte Carlo'에서 이름을 딴 알고리즘
- Kirkpatrick의 *Science* 논문 인용 횟수: **32,000회**
- 1943년 Luria의 잭팟 / 1880년 William James / 1960년 Campbell

### 실생활 적용 시나리오
- **창의성 막힘**: Oblique Strategies, Wikipedia 무작위 문서, CSA(농산물 박스 구독), 책·와인·초콜릿 of-the-month 클럽 — 일부러 외부 무작위성을 주입해 local maximum을 탈출.
- **공공정책 평가**: 평균 통계도, 체리피킹된 일화도 부족하다. **무작위 표본 인터뷰**가 가장 풍부한 정보를 준다(GiveDirectly 모델).
- **사이버 보안/암호화**: 신용카드 결제, 이메일, HTTPS 모두 Miller-Rabin이 뒤에서 돌고 있다.
- **인생 의사결정 — Dice Man의 교훈 3가지**:
  1. **Hill Climbing**: 좋은 아이디어는 *항상* 따르라.
  2. **Metropolis Algorithm**: 나쁜 아이디어를 따를 확률은 그 나쁨에 반비례하게.
  3. **Simulated Annealing**: 인생 초반엔 무작위성을 *front-load*하고, 점점 줄여가라. "Temper yourself — literally."

### 인용할 만한 명언/문장
- "I must admit that after many years of work in this area, the efficacy of randomness for so many algorithmic problems is absolutely mysterious to me." — Michael Rabin / "그렇게 많은 알고리즘 문제에서 무작위성이 효과적인 이유는, 솔직히 내게도 절대적으로 불가사의하다."
- "The river meanders because it can't think." — Richard Kenney / "강이 굽이치는 까닭은 생각을 못 하기 때문이다."
- "Negative Capability, that is, when a man is capable of being in uncertainties, mysteries, doubts, without any irritable reaching after fact and reason." — John Keats / "부정적 수용력 — 사실과 이성을 신경질적으로 추구하지 않고 불확실성·신비·의심 속에 머무를 수 있는 능력."
- "There is no such thing as absolute certainty, but there is assurance sufficient for the purposes of human life." — John Stuart Mill / "절대적 확실성은 없지만, 인생에 충분한 정도의 확신은 있다."
- "Once you got somewhere you were happy, you'd be stupid to shake it up any further." — George Cockcroft / "행복한 곳에 도달했으면 더 흔드는 건 어리석다."
- "Temper yourself — literally." / "(쇠를) 단조하라 — 말 그대로 너 자신을."

### 챕터에서 사용된 비유/인사이트
- **로브스터 통발 = local maximum**: 빠져나오려면 통발 안쪽으로 더 깊이 가야 한다. 국소 최대는 철망으로 만든 죽음의 함정.
- **Annealing(어닐링) = 인생 단조**: 뜨거울 때 자유롭게 변형, 천천히 식히면 결정 구조가 안정. 너무 빨리 식히면 결함과 유리질로 굳는다.
- **Slot Machine = 진화/돌연변이**: Luria의 통찰은 잭팟 분포 자체가 무작위성의 신호.
- **Serendipity의 어원**: 1754년 Horace Walpole이 '*The Three Princes of Serendip*' 동화에서 만든 단어. 추구하지 않은 것을 우연과 통찰로 발견하는 능력.
- **Veil of Ignorance + Monte Carlo**: 무지의 베일 뒤에서 정의를 가늠하는 것은 사실상 표본 추출 문제다.
- **3차원 trade-off**: 시간 × 공간 × 오류확률 — 컴퓨터과학의 새로운 좌표축.
- **'덜 생각하기'의 진수**: "강이 굽이치는 까닭은 생각을 못 하기 때문이다" — 그러나 강의 굽이짐이 풍경을 풍요롭게 한다.
