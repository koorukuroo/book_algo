import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../../theme";

const MACHINES = [
  { emoji: "🎰", trueP: 0.4, label: "A" },
  { emoji: "🎰", trueP: 0.7, label: "B" },
  { emoji: "🎰", trueP: 0.55, label: "C" },
  { emoji: "🎰", trueP: 0.85, label: "D" },
];

// Pre-rolled deterministic outcomes per machine for the win/lose pulls.
const ROLLS = [
  [0, 1, 0, 1, 0, 1, 0, 1], // A
  [1, 1, 0, 1, 1, 1, 1, 0], // B
  [1, 0, 1, 0, 1, 1, 0, 1], // C
  [1, 1, 1, 1, 0, 1, 1, 1], // D
];

export const BanditScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  // Machines pop in 60-200
  const machinesPop = MACHINES.map((_, i) =>
    spring({ frame: frame - (60 + i * 18), fps, from: 0, to: 1, config: { damping: 14 } }),
  );

  // Win-Stay/Lose-Shift trail starts at frame 300, one pull per 35 frames
  const PULL_START = 300;
  const PULL_FRAMES = 35;
  const sequence: { machine: number; win: number }[] = [];
  let cur = 0;
  let aIdx = 0;
  let bIdx = 0;
  let cIdx = 0;
  let dIdx = 0;
  for (let i = 0; i < 16; i++) {
    const pos = [aIdx, bIdx, cIdx, dIdx][cur];
    const win = ROLLS[cur][pos % ROLLS[cur].length];
    sequence.push({ machine: cur, win });
    if (cur === 0) aIdx++;
    if (cur === 1) bIdx++;
    if (cur === 2) cIdx++;
    if (cur === 3) dIdx++;
    if (!win) cur = (cur + 1) % MACHINES.length;
  }

  const pullsShown = Math.max(0, Math.floor((frame - PULL_START) / PULL_FRAMES));
  const visiblePulls = sequence.slice(0, Math.min(pullsShown, 16));

  // Caption pop on frame 700+
  const captionOp = interpolate(frame, [700, 760], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        padding: "60px 80px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
      }}
    >
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 72,
          color: theme.ink,
          opacity: titleOp,
        }}
      >
        🎰 다중 슬롯머신 문제
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 30,
          color: theme.muted,
          opacity: titleOp,
        }}
      >
        머신마다 보상 확률이 다릅니다 — 그런데 우리는 그 확률을 모릅니다
      </div>

      <div style={{ display: "flex", gap: 40, marginTop: 20 }}>
        {MACHINES.map((m, i) => {
          const pullsHere = visiblePulls.filter((p) => p.machine === i);
          const isCurrent =
            visiblePulls.length > 0 &&
            visiblePulls[visiblePulls.length - 1].machine === i;
          return (
            <div
              key={i}
              style={{
                transform: `scale(${machinesPop[i] * (isCurrent ? 1.06 : 1)})`,
                background: "white",
                border: `5px solid ${isCurrent ? theme.accent : theme.line}`,
                borderRadius: 24,
                padding: "20px 28px",
                width: 200,
                textAlign: "center",
                boxShadow: isCurrent ? `0 0 0 6px ${theme.accentSoft}` : "none",
              }}
            >
              <div style={{ fontSize: 84 }}>{m.emoji}</div>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 40,
                  color: theme.ink,
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 18,
                  color: theme.muted,
                  marginBottom: 8,
                }}
              >
                ?% 확률
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 4,
                  justifyContent: "center",
                  minHeight: 30,
                }}
              >
                {pullsHere.map((p, j) => (
                  <span
                    key={j}
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 6,
                      background: p.win ? theme.mint : theme.accent,
                      display: "inline-block",
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 48,
          color: theme.accent,
          opacity: captionOp,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        Win-Stay, Lose-Shift
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 30,
          color: theme.inkSoft,
          opacity: captionOp,
          textAlign: "center",
        }}
      >
        이기면 계속 · 지면 다른 머신으로
      </div>
    </AbsoluteFill>
  );
};
