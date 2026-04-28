export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-bg-soft)] mt-24">
      <div className="max-w-6xl mx-auto px-5 py-10 text-sm text-[var(--color-muted)] flex flex-col md:flex-row justify-between gap-4">
        <div>
          <p className="font-display text-base text-[var(--color-ink)] mb-1">
            알고리즘, 인생을 계산하다
          </p>
          <p>
            Brian Christian · Tom Griffiths,{" "}
            <em>Algorithms to Live By: The Computer Science of Human Decisions</em>{" "}
            (2016)
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p>이 사이트는 책의 핵심 개념을 학습용으로 정리한 비공식 가이드입니다.</p>
          <p>모든 알고리즘은 직접 시뮬레이션해 볼 수 있습니다.</p>
        </div>
      </div>
    </footer>
  );
}
