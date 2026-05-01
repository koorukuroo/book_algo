import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { theme, fonts } from "../../theme";

// Pre-shuffled scores so the render is deterministic.
const SCORES = [
  6, 12, 3, 17, 8, 11, 19, 2, 14, 16, 5, 20, 9, 7, 13, 1, 15, 10, 4, 18,
];
const TOTAL = SCORES.length;
const LOOK_N = Math.floor(TOTAL * 0.37); // 7
const BENCHMARK = Math.max(...SCORES.slice(0, LOOK_N));
// Pick: first index >= LOOK_N where score > BENCHMARK
const PICK_INDEX = (() => {
  for (let i = LOOK_N; i < TOTAL; i++) if (SCORES[i] > BENCHMARK) return i;
  return TOTAL - 1;
})();

export const SimulationScene = () => {
  const frame = useCurrentFrame();

  // Sweep timed to the 25s narration:
  //   0-90    intro fade
  //   90-540  cursor sweep (15s)
  //   540-600 result reveal
  //   600+    hold
  const cursorIndex = Math.min(
    TOTAL - 1,
    Math.max(0, Math.floor(interpolate(frame, [90, 540], [0, TOTAL - 1])))
  );
  const showResult = frame > 540;
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const benchmarkOp = interpolate(frame, [180, 240], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        padding: "60px 80px",
        flexDirection: "column",
        gap: 40,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 80,
          color: theme.ink,
          opacity: titleOpacity,
        }}
      >
        직접 돌려봅시다 🎬
      </div>

      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 32,
          color: theme.muted,
          opacity: titleOpacity,
          marginBottom: 20,
        }}
      >
        20명의 후보 (점수 1~20). 1등은 누구일까요?
      </div>

      {/* Candidates with cursor */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${TOTAL}, 1fr)`,
          gap: 14,
          maxWidth: 1600,
          width: "100%",
          position: "relative",
          padding: "60px 0 40px",
        }}
      >
        {SCORES.map((score, i) => {
          const inLook = i < LOOK_N;
          const isPicked = showResult && i === PICK_INDEX;
          const isPassed = i < cursorIndex && !inLook && !isPicked;
          const isCurrent = i === cursorIndex && !showResult;
          const isBest = score === TOTAL;

          let bg = "white";
          let textColor = theme.muted;
          let borderColor = theme.line;
          let scaleX = 1;
          if (inLook) {
            bg = theme.bgSoft;
          }
          if (isPassed) {
            bg = "white";
          }
          if (isCurrent) {
            bg = theme.sun;
            borderColor = theme.sun;
            textColor = theme.ink;
            scaleX = 1.15;
          }
          if (isPicked) {
            bg = theme.accent;
            borderColor = theme.accent;
            textColor = "white";
            scaleX = 1.2;
          }

          return (
            <div
              key={i}
              style={{
                aspectRatio: "1 / 1",
                background: bg,
                border: `4px solid ${borderColor}`,
                borderRadius: 16,
                fontFamily: fonts.body,
                fontSize: 36,
                fontWeight: 700,
                color: textColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${scaleX})`,
                position: "relative",
                textDecoration: isPassed ? "line-through" : "none",
                opacity: isPassed ? 0.45 : 1,
                transition: "transform 80ms ease",
              }}
            >
              {score}
              {isBest && (
                <div
                  style={{
                    position: "absolute",
                    top: -22,
                    right: -10,
                    fontSize: 36,
                  }}
                >
                  ⭐
                </div>
              )}
            </div>
          );
        })}

        {/* Vertical line marking the 37% boundary */}
        <div
          style={{
            position: "absolute",
            left: `calc(${(LOOK_N / TOTAL) * 100}% - 7px)`,
            top: 30,
            bottom: 30,
            width: 4,
            background: theme.accent,
            borderRadius: 2,
            opacity: benchmarkOp,
          }}
        />
      </div>

      {/* Result row */}
      <div
        style={{
          display: "flex",
          gap: 60,
          marginTop: 20,
        }}
      >
        <Stat
          label="기준점 (관찰 후 최고)"
          value={`${BENCHMARK}`}
          color={theme.muted}
          opacity={benchmarkOp}
        />
        <Stat
          label="채용한 점수"
          value={showResult ? `${SCORES[PICK_INDEX]}` : "..."}
          color={
            showResult && SCORES[PICK_INDEX] === TOTAL
              ? theme.mint
              : theme.accent
          }
          big
        />
        {showResult && SCORES[PICK_INDEX] === TOTAL && (
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: 64,
              color: theme.mint,
            }}
          >
            🎯 1등!
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

const Stat = ({
  label,
  value,
  color,
  opacity = 1,
  big = false,
}: {
  label: string;
  value: string;
  color: string;
  opacity?: number;
  big?: boolean;
}) => (
  <div style={{ opacity, textAlign: "center" }}>
    <div
      style={{
        fontFamily: fonts.body,
        fontSize: 28,
        color: theme.muted,
        marginBottom: 8,
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontFamily: fonts.display,
        fontSize: big ? 120 : 80,
        fontWeight: 700,
        color,
        lineHeight: 1,
      }}
    >
      {value}
    </div>
  </div>
);
