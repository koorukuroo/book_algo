import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../theme";

export const TitleScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, from: 0.6, to: 1, config: { damping: 12 } });
  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });
  const numberPop = spring({
    frame: frame - 30,
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 120 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${theme.accentSoft}, ${theme.bg} 60%, ${theme.mintSoft})`,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 30,
      }}
    >
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 32,
          letterSpacing: 6,
          color: theme.muted,
          textTransform: "uppercase",
          opacity: subtitleOpacity,
        }}
      >
        Algorithms to Live By · Chapter 01
      </div>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 220,
          fontWeight: 700,
          letterSpacing: -6,
          transform: `scale(${titleScale})`,
          color: theme.ink,
          lineHeight: 1,
          textAlign: "center",
        }}
      >
        최적 멈춤
      </div>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 64,
          color: theme.accent,
          opacity: subtitleOpacity,
        }}
      >
        언제 그만 찾을까?
      </div>
      <div
        style={{
          marginTop: 40,
          padding: "12px 40px",
          borderRadius: 999,
          background: theme.ink,
          color: "white",
          fontFamily: fonts.display,
          fontSize: 56,
          letterSpacing: -2,
          transform: `scale(${numberPop})`,
        }}
      >
        ✨ 37% 규칙 ✨
      </div>
    </AbsoluteFill>
  );
};
