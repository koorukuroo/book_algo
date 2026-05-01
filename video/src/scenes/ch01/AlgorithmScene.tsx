import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme, fonts } from "../../theme";

const TOTAL = 20;
const LOOK_FRAC = 0.37;
const LOOK_N = Math.floor(TOTAL * LOOK_FRAC);

export const AlgorithmScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title fade
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Stagger candidate pop-in (frames 30 → 30 + TOTAL*4)
  const candidates = Array.from({ length: TOTAL }, (_, i) => {
    const start = 30 + i * 4;
    const scale = spring({
      frame: frame - start,
      fps,
      from: 0,
      to: 1,
      config: { damping: 14 },
    });
    return scale;
  });

  // After all candidates appear (around frame 110), fade the LOOK region
  // Narration timeline (30s scene): the 37% number is mentioned around 25s.
  const lookOverlay = interpolate(frame, [200, 260], [0, 1], { extrapolateRight: "clamp" });

  // Big "37%" reveal — sized to land on "약 36.79퍼센트" in the audio
  const numberOp = interpolate(frame, [600, 660], [0, 1], { extrapolateRight: "clamp" });
  const numberScale = spring({
    frame: frame - 600,
    fps,
    from: 0.4,
    to: 1,
    config: { damping: 10 },
  });

  // Leap explanation lingers from ~12s onward
  const leapOp = interpolate(frame, [380, 440], [0, 1], { extrapolateRight: "clamp" });

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
          fontSize: 84,
          color: theme.ink,
          opacity: titleOpacity,
        }}
      >
        <span style={{ color: theme.muted }}>알고리즘:</span>{" "}
        <span style={{ color: theme.accent }}>Look-Then-Leap</span>
      </div>

      {/* Candidates row */}
      <div
        style={{
          display: "flex",
          gap: 18,
          alignItems: "flex-end",
          padding: "60px 30px",
          position: "relative",
        }}
      >
        {candidates.map((scale, i) => (
          <div
            key={i}
            style={{
              width: 70,
              height: 70,
              borderRadius: 18,
              background: i < LOOK_N ? theme.bgSoft : "white",
              border: `3px solid ${i < LOOK_N ? theme.line : theme.line}`,
              transform: `scale(${scale})`,
              fontFamily: fonts.body,
              fontSize: 28,
              fontWeight: 700,
              color: theme.muted,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {i + 1}
          </div>
        ))}

        {/* LOOK region overlay */}
        <div
          style={{
            position: "absolute",
            left: 16,
            top: 30,
            width: LOOK_N * 88 - 18 + 28,
            height: 130,
            border: `4px dashed ${theme.accent}`,
            borderRadius: 18,
            opacity: lookOverlay,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 30,
            top: -18,
            width: LOOK_N * 88,
            textAlign: "center",
            fontFamily: fonts.display,
            fontSize: 36,
            color: theme.accent,
            opacity: lookOverlay,
          }}
        >
          👀 처음 37% — 관찰만 (Look)
        </div>
      </div>

      {/* Big 37% reveal */}
      <div
        style={{
          opacity: numberOp,
          transform: `scale(${numberScale})`,
          fontFamily: fonts.display,
          fontSize: 280,
          fontWeight: 700,
          color: theme.accent,
          lineHeight: 1,
          letterSpacing: -8,
        }}
      >
        37%
      </div>

      {/* Leap caption */}
      <div
        style={{
          opacity: leapOp,
          fontFamily: fonts.body,
          fontSize: 40,
          color: theme.inkSoft,
          textAlign: "center",
          maxWidth: 1200,
          lineHeight: 1.5,
        }}
      >
        그 후, <strong style={{ color: theme.accent }}>지금까지의 최고를 능가하는 첫 번째</strong>를 만나면{" "}
        <span style={{ color: theme.mint, fontWeight: 700 }}>즉시 결단(Leap)</span>.
      </div>
    </AbsoluteFill>
  );
};
