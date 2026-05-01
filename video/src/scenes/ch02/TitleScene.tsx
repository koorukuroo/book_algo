import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../../theme";

export const TitleScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleScale = spring({ frame, fps, from: 0.6, to: 1, config: { damping: 12 } });
  const subOp = interpolate(frame, [40, 80], [0, 1], { extrapolateRight: "clamp" });
  const tagOp = interpolate(frame, [110, 150], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(140deg, ${theme.bg}, ${theme.mintSoft} 70%)`,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        gap: 30,
      }}
    >
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 28,
          color: theme.muted,
          letterSpacing: 6,
          textTransform: "uppercase",
        }}
      >
        Chapter 02 · Explore / Exploit
      </div>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 200,
          color: theme.ink,
          lineHeight: 1,
          transform: `scale(${titleScale})`,
        }}
      >
        탐색과 <span style={{ color: theme.mint }}>활용</span>
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 48,
          color: theme.inkSoft,
          opacity: subOp,
          marginTop: 20,
        }}
      >
        최신 vs 최고
      </div>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 36,
          color: theme.accent,
          opacity: tagOp,
          marginTop: 30,
        }}
      >
        🎰 다중 슬롯머신 문제
      </div>
    </AbsoluteFill>
  );
};
