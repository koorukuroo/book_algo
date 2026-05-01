import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme, fonts } from "../../theme";

export const OutroScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const quoteOp = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const sourceOp = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const nextOp = interpolate(frame, [180, 220], [0, 1], { extrapolateRight: "clamp" });
  const arrow = spring({
    frame: frame - 200,
    fps,
    from: 0,
    to: 1,
    config: { damping: 14 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${theme.bg}, ${theme.accentSoft})`,
        padding: "100px 120px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
      }}
    >
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 88,
          color: theme.ink,
          textAlign: "center",
          maxWidth: 1500,
          lineHeight: 1.3,
          opacity: quoteOp,
        }}
      >
        “망설임도 행동과 똑같이 <br />
        <span style={{ color: theme.accent }}>되돌릴 수 없다.</span>”
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 32,
          color: theme.muted,
          opacity: sourceOp,
        }}
      >
        ─ 『알고리즘, 인생을 계산하다』 · Brian Christian & Tom Griffiths
      </div>

      <div
        style={{
          marginTop: 40,
          padding: "20px 50px",
          background: theme.ink,
          color: "white",
          borderRadius: 999,
          fontFamily: fonts.display,
          fontSize: 44,
          opacity: nextOp,
          transform: `translateY(${(1 - arrow) * 20}px)`,
        }}
      >
        다음 챕터 → <span style={{ color: theme.mintSoft }}>탐색과 활용</span>
      </div>
    </AbsoluteFill>
  );
};
