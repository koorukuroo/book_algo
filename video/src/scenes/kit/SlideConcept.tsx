import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../../theme";

// A versatile "concept" slide: title + headline + visual block.
// Visual variants: "comparison" (two cards), "table" (rows), "bigNumber" (giant
// number with caption), "list" (numbered/lettered bullets).
export type SlideConceptProps = {
  eyebrow?: string;        // small uppercase context
  title: string;           // big display title
  highlight?: string;      // word inside the title to color
  color: "accent" | "mint" | "sky" | "sun" | "plum";
  visual:
    | { kind: "comparison"; left: { label: string; emoji: string; title: string; sub: string }; right: { label: string; emoji: string; title: string; sub: string } }
    | { kind: "table"; columns: [string, string]; rows: { left: string; right: string; highlight?: boolean }[] }
    | { kind: "bigNumber"; number: string; suffix?: string; caption: string }
    | { kind: "list"; items: { tag: string; title: string; sub: string }[] };
  footer?: string;         // optional one-liner under the visual
};

const COLORS: Record<SlideConceptProps["color"], { fg: string; soft: string }> = {
  accent: { fg: theme.accent, soft: theme.accentSoft },
  mint: { fg: theme.mint, soft: theme.mintSoft },
  sky: { fg: theme.sky, soft: theme.skySoft },
  sun: { fg: theme.sun, soft: theme.sunSoft },
  plum: { fg: theme.plum, soft: theme.plumSoft },
};

export const SlideConcept = (props: SlideConceptProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { fg, soft } = COLORS[props.color];

  const eyebrowOp = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleOp = interpolate(frame, [20, 60], [0, 1], { extrapolateRight: "clamp" });
  const visualOp = interpolate(frame, [80, 130], [0, 1], { extrapolateRight: "clamp" });
  const footerOp = interpolate(frame, [180, 230], [0, 1], { extrapolateRight: "clamp" });

  const renderTitle = () => {
    if (!props.highlight || !props.title.includes(props.highlight)) {
      return props.title;
    }
    const [before, after] = props.title.split(props.highlight);
    return (
      <>
        {before}
        <span style={{ color: fg }}>{props.highlight}</span>
        {after}
      </>
    );
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        padding: "70px 100px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
      }}
    >
      {props.eyebrow && (
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 26,
            color: theme.muted,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: eyebrowOp,
          }}
        >
          {props.eyebrow}
        </div>
      )}
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 88,
          color: theme.ink,
          lineHeight: 1.1,
          textAlign: "center",
          maxWidth: 1500,
          opacity: titleOp,
        }}
      >
        {renderTitle()}
      </div>
      <div style={{ opacity: visualOp, width: "100%", display: "flex", justifyContent: "center" }}>
        {renderVisual(props.visual, fg, soft, frame, fps)}
      </div>
      {props.footer && (
        <div
          style={{
            opacity: footerOp,
            fontFamily: fonts.body,
            fontSize: 32,
            color: theme.inkSoft,
            textAlign: "center",
            maxWidth: 1400,
            lineHeight: 1.4,
            marginTop: 10,
          }}
        >
          {props.footer}
        </div>
      )}
    </AbsoluteFill>
  );
};

function renderVisual(
  v: SlideConceptProps["visual"],
  fg: string,
  soft: string,
  frame: number,
  fps: number,
) {
  if (v.kind === "comparison") {
    return (
      <div style={{ display: "flex", gap: 50, alignItems: "stretch", maxWidth: 1500, width: "100%" }}>
        <ComparisonCard {...v.left} fg={fg} />
        <div style={{ fontFamily: fonts.display, fontSize: 80, color: theme.muted, alignSelf: "center" }}>
          vs
        </div>
        <ComparisonCard {...v.right} fg={fg} />
      </div>
    );
  }
  if (v.kind === "table") {
    return (
      <div
        style={{
          background: "white",
          borderRadius: 24,
          padding: "30px 50px",
          border: `4px solid ${theme.line}`,
          boxShadow: `8px 8px 0 ${theme.ink}`,
          minWidth: 800,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: fonts.body,
            fontSize: 22,
            color: theme.muted,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          <span>{v.columns[0]}</span>
          <span>{v.columns[1]}</span>
        </div>
        {v.rows.map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "16px 16px",
              background: row.highlight ? soft : "transparent",
              borderRadius: 12,
              borderBottom: i === v.rows.length - 1 ? "none" : `2px dashed ${theme.line}`,
              fontFamily: fonts.display,
              fontSize: 36,
              color: row.highlight ? fg : theme.ink,
              fontWeight: 700,
            }}
          >
            <span>{row.left}</span>
            <span>{row.right}</span>
          </div>
        ))}
      </div>
    );
  }
  if (v.kind === "bigNumber") {
    const popScale = spring({ frame: frame - 90, fps, from: 0.4, to: 1, config: { damping: 10 } });
    return (
      <div style={{ textAlign: "center", transform: `scale(${popScale})` }}>
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 280,
            fontWeight: 700,
            color: fg,
            lineHeight: 1,
            letterSpacing: -8,
          }}
        >
          {v.number}
          {v.suffix && <span style={{ fontSize: 100, marginLeft: 8 }}>{v.suffix}</span>}
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 36, color: theme.inkSoft, marginTop: 16 }}>
          {v.caption}
        </div>
      </div>
    );
  }
  if (v.kind === "list") {
    return (
      <div style={{ display: "flex", gap: 30, flexWrap: "wrap", justifyContent: "center", maxWidth: 1600 }}>
        {v.items.map((item, i) => (
          <div
            key={i}
            style={{
              flex: "1 1 360px",
              maxWidth: 480,
              background: "white",
              border: `4px solid ${theme.line}`,
              borderRadius: 24,
              padding: "24px 28px",
              boxShadow: `6px 6px 0 ${fg}`,
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: fg,
                color: "white",
                padding: "6px 16px",
                borderRadius: 999,
                fontFamily: fonts.display,
                fontSize: 22,
                marginBottom: 12,
              }}
            >
              {item.tag}
            </div>
            <div style={{ fontFamily: fonts.display, fontSize: 38, color: theme.ink, lineHeight: 1.2 }}>
              {item.title}
            </div>
            <div style={{ fontFamily: fonts.body, fontSize: 24, color: theme.muted, marginTop: 8, lineHeight: 1.5 }}>
              {item.sub}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

const ComparisonCard = ({
  label,
  emoji,
  title,
  sub,
  fg,
}: {
  label: string;
  emoji: string;
  title: string;
  sub: string;
  fg: string;
}) => (
  <div
    style={{
      flex: 1,
      background: "white",
      border: `4px solid ${fg}`,
      borderRadius: 24,
      padding: "30px 24px",
      textAlign: "center",
      boxShadow: `8px 8px 0 ${fg}`,
    }}
  >
    <div style={{ fontSize: 84 }}>{emoji}</div>
    <div
      style={{
        fontFamily: fonts.body,
        fontSize: 22,
        color: fg,
        fontWeight: 700,
        letterSpacing: 3,
        textTransform: "uppercase",
        marginTop: 10,
      }}
    >
      {label}
    </div>
    <div style={{ fontFamily: fonts.display, fontSize: 48, color: theme.ink, marginTop: 8 }}>
      {title}
    </div>
    <div style={{ fontFamily: fonts.body, fontSize: 28, color: theme.muted, marginTop: 6 }}>
      {sub}
    </div>
  </div>
);
