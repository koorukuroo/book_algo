import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../../theme";

export type SlideOutroProps = {
  quote: string;            // primary line
  quoteHighlight?: string;  // word inside quote to color
  subtitle?: string;        // secondary line
  nextLabel?: string;       // "다음: 캐싱 — 잊어버려도 괜찮아"
  color: "accent" | "mint" | "sky" | "sun" | "plum";
};

const COLORS: Record<SlideOutroProps["color"], { fg: string; soft: string }> = {
  accent: { fg: theme.accent, soft: theme.accentSoft },
  mint: { fg: theme.mint, soft: theme.mintSoft },
  sky: { fg: theme.sky, soft: theme.skySoft },
  sun: { fg: theme.sun, soft: theme.sunSoft },
  plum: { fg: theme.plum, soft: theme.plumSoft },
};

export const SlideOutro = ({ quote, quoteHighlight, subtitle, nextLabel, color }: SlideOutroProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { fg, soft } = COLORS[color];

  const quoteOp = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" });
  const subOp = interpolate(frame, [120, 180], [0, 1], { extrapolateRight: "clamp" });
  const teaserOp = interpolate(frame, [260, 320], [0, 1], { extrapolateRight: "clamp" });
  const teaserScale = spring({ frame: frame - 260, fps, from: 0.85, to: 1, config: { damping: 14 } });

  const renderQuote = () => {
    if (!quoteHighlight || !quote.includes(quoteHighlight)) {
      return quote;
    }
    const [before, after] = quote.split(quoteHighlight);
    return (
      <>
        {before}
        <span style={{ color: fg }}>{quoteHighlight}</span>
        {after}
      </>
    );
  };

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${theme.bg}, ${soft} 70%)`,
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
          fontSize: 76,
          color: theme.ink,
          opacity: quoteOp,
          textAlign: "center",
          lineHeight: 1.25,
          maxWidth: 1500,
        }}
      >
        "{renderQuote()}"
      </div>
      {subtitle && (
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
          {subtitle}
        </div>
      )}
      {nextLabel && (
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
            fontSize: 38,
            color: theme.ink,
          }}
        >
          {nextLabel}
        </div>
      )}
    </AbsoluteFill>
  );
};
