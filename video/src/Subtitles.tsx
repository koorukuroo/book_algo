import { useCurrentFrame } from "remotion";
import { fonts } from "./theme";

type Cue = { text: string; fromFrame: number; toFrame: number; scene?: string };

export const Subtitles = ({ cues }: { cues: Cue[] }) => {
  const frame = useCurrentFrame();
  const active = cues.find((c) => frame >= c.fromFrame && frame <= c.toFrame);
  if (!active) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 60,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          maxWidth: 1500,
          padding: "18px 40px",
          background: "rgba(15, 18, 28, 0.78)",
          color: "white",
          fontFamily: fonts.body,
          fontSize: 38,
          fontWeight: 600,
          lineHeight: 1.35,
          textAlign: "center",
          borderRadius: 14,
          letterSpacing: "-0.5px",
          boxShadow: `0 6px 24px rgba(0,0,0,0.35)`,
        }}
      >
        {active.text}
      </div>
    </div>
  );
};
