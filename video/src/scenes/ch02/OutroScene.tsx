import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../../theme";

export const OutroScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const quoteOp = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" });
  const subOp = interpolate(frame, [120, 180], [0, 1], { extrapolateRight: "clamp" });
  const teaserOp = interpolate(frame, [260, 320], [0, 1], { extrapolateRight: "clamp" });
  const teaserScale = spring({
    frame: frame - 260,
    fps,
    from: 0.85,
    to: 1,
    config: { damping: 14 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${theme.bg}, ${theme.plumSoft} 70%)`,
        padding: "80px 120px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
      }}
    >
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 84,
          color: theme.ink,
          opacity: quoteOp,
          textAlign: "center",
          lineHeight: 1.2,
          maxWidth: 1500,
        }}
      >
        "탐색 그 자체에<br />
        <span style={{ color: theme.accent }}>가치가 있다</span>."
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 32,
          color: theme.muted,
          opacity: subOp,
          textAlign: "center",
          maxWidth: 1300,
          lineHeight: 1.5,
        }}
      >
        불안한 세계에서 살려면<br />
        자신 안에도 어떤 불안함이 필요합니다.
      </div>

      <div
        style={{
          opacity: teaserOp,
          transform: `scale(${teaserScale})`,
          marginTop: 40,
          padding: "20px 40px",
          background: "white",
          borderRadius: 30,
          border: `4px solid ${theme.ink}`,
          boxShadow: `8px 8px 0 ${theme.ink}`,
          fontFamily: fonts.display,
          fontSize: 40,
          color: theme.ink,
        }}
      >
        다음: <span style={{ color: theme.sky }}>📚 정렬 — 질서를 만드는 법</span>
      </div>
    </AbsoluteFill>
  );
};
