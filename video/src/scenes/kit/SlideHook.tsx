import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../../theme";

export type SlideHookProps = {
  imageSrc: string;        // "images/webtoons-v/ch03.jpg"
  eyebrow: string;         // "오늘의 딜레마"
  bodyLines: string[];     // 1–3 lines
  punch?: string;          // optional accent line
  color: "accent" | "mint" | "sky" | "sun" | "plum";
};

const COLORS: Record<SlideHookProps["color"], string> = {
  accent: theme.accent,
  mint: theme.mint,
  sky: theme.sky,
  sun: theme.sun,
  plum: theme.plum,
};

export const SlideHook = ({ imageSrc, eyebrow, bodyLines, punch, color }: SlideHookProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fg = COLORS[color];

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const imgScale = spring({ frame: frame - 20, fps, from: 0.85, to: 1, config: { damping: 14 } });
  const lineOps = bodyLines.map((_, i) =>
    interpolate(frame, [80 + i * 50, 130 + i * 50], [0, 1], { extrapolateRight: "clamp" }),
  );
  const punchOp = interpolate(
    frame,
    [80 + bodyLines.length * 50 + 60, 130 + bodyLines.length * 50 + 60],
    [0, 1],
    { extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        padding: "60px 80px",
        flexDirection: "row",
        gap: 80,
        alignItems: "center",
      }}
    >
      <div style={{ flex: "0 0 460px", transform: `scale(${imgScale})` }}>
        <div
          style={{
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            border: `4px solid ${theme.ink}`,
            boxShadow: `10px 10px 0 ${theme.ink}`,
            aspectRatio: "9 / 16",
          }}
        >
          <Img
            src={staticFile(imageSrc)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 28,
            color: theme.muted,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: titleOp,
          }}
        >
          {eyebrow}
        </div>
        {bodyLines.map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: fonts.body,
              fontSize: i === 0 ? 44 : 36,
              color: i === 0 ? theme.ink : theme.inkSoft,
              lineHeight: 1.5,
              opacity: lineOps[i],
            }}
          >
            {line}
          </div>
        ))}
        {punch && (
          <div
            style={{
              marginTop: 20,
              fontFamily: fonts.display,
              fontSize: 48,
              color: fg,
              opacity: punchOp,
              lineHeight: 1.3,
            }}
          >
            {punch}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
