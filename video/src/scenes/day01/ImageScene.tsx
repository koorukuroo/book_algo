import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type FocalPoint = { x: number; y: number };

export type ImageSceneProps = {
  src: string;
  durationInFrames: number;
  zoomFrom?: number;
  zoomTo?: number;
  panFrom?: FocalPoint;
  panTo?: FocalPoint;
  fadeIn?: number;
  fadeOut?: number;
  shakeAt?: { startFrame: number; durationFrames: number; intensity?: number };
  decoration?: React.ReactNode;
};

export const ImageScene = ({
  src,
  durationInFrames,
  zoomFrom = 1.0,
  zoomTo = 1.15,
  panFrom = { x: 50, y: 50 },
  panTo = { x: 50, y: 50 },
  fadeIn = 18,
  fadeOut = 14,
  shakeAt,
  decoration,
}: ImageSceneProps) => {
  const frame = useCurrentFrame();

  const op = Math.min(
    interpolate(frame, [0, fadeIn], [0, 1], { extrapolateRight: "clamp" }),
    interpolate(frame, [durationInFrames - fadeOut, durationInFrames], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const t = Math.min(1, frame / durationInFrames);
  const zoom = zoomFrom + (zoomTo - zoomFrom) * t;
  const px = panFrom.x + (panTo.x - panFrom.x) * t;
  const py = panFrom.y + (panTo.y - panFrom.y) * t;

  // Camera shake (decays over its window)
  let sx = 0;
  let sy = 0;
  if (shakeAt) {
    const sd = (frame - shakeAt.startFrame) / shakeAt.durationFrames;
    if (sd >= 0 && sd <= 1) {
      const decay = (1 - sd) ** 2;
      const intensity = shakeAt.intensity ?? 8;
      sx = Math.sin(frame * 1.7) * intensity * decay;
      sy = Math.cos(frame * 2.1) * intensity * decay;
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "#fff4ed", overflow: "hidden", opacity: op }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `translate(${sx}px, ${sy}px) scale(${zoom})`,
          transformOrigin: `${px}% ${py}%`,
        }}
      />
      {decoration}
    </AbsoluteFill>
  );
};

// ─── Decoration overlays ──────────────────────────────────────────────────

const PARTICLE_FONTS = ["💖", "💗", "💕", "✨", "💘"];

export const FloatingHearts = ({
  count = 12,
  durationInFrames,
}: {
  count?: number;
  durationInFrames: number;
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: count }, (_, i) => {
        const seedX = (i * 137) % 100;
        const seedDelay = (i * 23) % durationInFrames;
        const local = (frame - seedDelay + durationInFrames) % durationInFrames;
        const lifeT = local / durationInFrames;
        const yPos = 110 - lifeT * 130;
        const xJitter = Math.sin((frame + i * 30) / 28) * 4;
        const op = interpolate(lifeT, [0, 0.1, 0.85, 1], [0, 0.85, 0.85, 0]);
        const size = 28 + ((i * 7) % 24);
        const rot = Math.sin((frame + i * 10) / 32) * 12;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${seedX + xJitter}%`,
              top: `${yPos}%`,
              fontSize: size,
              opacity: op,
              transform: `rotate(${rot}deg)`,
              filter: "drop-shadow(0 4px 6px rgba(255,90,140,0.35))",
            }}
          >
            {PARTICLE_FONTS[i % PARTICLE_FONTS.length]}
          </span>
        );
      })}
    </AbsoluteFill>
  );
};

// Soft radial glow that breathes — no harsh ring.
export const Glow = ({
  x,
  y,
  size = 280,
  color = "#ff5d8f",
  delay = 0,
  intensity = 0.55,
}: {
  x: number;
  y: number;
  size?: number;
  color?: string;
  delay?: number;
  intensity?: number;
}) => {
  const frame = useCurrentFrame();
  if (frame < delay) return null;
  const breathe = 0.7 + Math.sin((frame - delay) / 18) * 0.3;
  const op = breathe * intensity;
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        background: `radial-gradient(circle, ${color} 0%, ${color}88 25%, ${color}33 50%, transparent 70%)`,
        opacity: op,
        filter: "blur(6px)",
      }}
    />
  );
};

// A spotlight that walks across a sequence of x positions and settles on the last.
export const HighlightWalk = ({
  stops,
  startFrame,
  stepFrames = 35,
  size = 220,
  color = "rgba(255, 220, 130, 0.55)",
}: {
  stops: { x: number; y: number }[];
  startFrame: number;
  stepFrames?: number;
  size?: number;
  color?: string;
}) => {
  const frame = useCurrentFrame();
  if (frame < startFrame || stops.length === 0) return null;
  const local = frame - startFrame;
  const idx = Math.min(stops.length - 1, Math.floor(local / stepFrames));
  const inStep = (local - idx * stepFrames) / stepFrames;
  const cur = stops[idx];
  const next = stops[Math.min(stops.length - 1, idx + 1)];
  const x = cur.x + (next.x - cur.x) * inStep;
  const y = cur.y + (next.y - cur.y) * inStep;
  // After settling on the final stop, hold + breathe
  const settled = idx >= stops.length - 1;
  const breathe = settled ? 0.8 + Math.sin(local / 12) * 0.2 : 0.85;
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        background: `radial-gradient(circle, ${color} 0%, ${color} 25%, transparent 65%)`,
        opacity: breathe * 0.65,
        filter: "blur(4px)",
      }}
    />
  );
};

// Sweep light bar that crosses the screen from left to right.
export const SpotlightSweep = ({
  durationInFrames,
  startFrame = 0,
  color = "rgba(255, 235, 180, 0.55)",
}: {
  durationInFrames: number;
  startFrame?: number;
  color?: string;
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [startFrame, startFrame + durationInFrames], [-30, 130], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: `${t}%`,
        width: 260,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        transform: "skewX(-15deg)",
        pointerEvents: "none",
      }}
    />
  );
};

// Stamp that pops onto the screen at a specific frame.
export const PopStamp = ({
  text,
  x,
  y,
  appearAt,
  rotate = -8,
  color = "#ff5d8f",
  size = 72,
}: {
  text: string;
  x: number;
  y: number;
  appearAt: number;
  rotate?: number;
  color?: string;
  size?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({
    frame: frame - appearAt,
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 140 },
  });
  if (scale === 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,
        pointerEvents: "none",
        fontFamily: "Gaegu, sans-serif",
        fontSize: size,
        fontWeight: 900,
        color: "white",
        background: color,
        padding: "10px 28px",
        borderRadius: 14,
        border: `6px solid white`,
        boxShadow: `0 0 0 6px ${color}, 0 8px 24px rgba(0,0,0,0.25)`,
        letterSpacing: -2,
      }}
    >
      {text}
    </div>
  );
};

// Brief screen flash for emphasis.
export const Flash = ({
  startFrame,
  durationFrames = 12,
  color = "#ffffff",
  intensity = 0.7,
}: {
  startFrame: number;
  durationFrames?: number;
  color?: string;
  intensity?: number;
}) => {
  const frame = useCurrentFrame();
  const t = (frame - startFrame) / durationFrames;
  if (t < 0 || t > 1) return null;
  const op = (1 - t) * intensity;
  return (
    <AbsoluteFill style={{ background: color, opacity: op, pointerEvents: "none" }} />
  );
};

// Confetti for celebrations.
const CONFETTI = ["💗", "✨", "🎉", "💖", "🌸", "⭐"];
export const Confetti = ({ count = 28 }: { count?: number }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: count }, (_, i) => {
        const seedX = (i * 41) % 100;
        const speed = 0.4 + ((i * 7) % 100) / 200;
        const fallY = (frame * speed) % 130;
        const drift = Math.sin((frame + i * 25) / 30) * 3;
        const rot = (frame * 2 + i * 30) % 360;
        const op = interpolate(fallY, [0, 5, 95, 100], [0, 0.95, 0.95, 0]);
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${seedX + drift}%`,
              top: `${fallY - 10}%`,
              fontSize: 32 + ((i * 5) % 20),
              opacity: op,
              transform: `rotate(${rot}deg)`,
              filter: "drop-shadow(0 4px 6px rgba(255,90,140,0.3))",
            }}
          >
            {CONFETTI[i % CONFETTI.length]}
          </span>
        );
      })}
    </AbsoluteFill>
  );
};

// Floating arrow that bobs up and down — points at something.
export const BobArrow = ({
  x,
  y,
  appearAt,
  rotation = 0,
  color = "#ff5d8f",
  emoji = "👇",
}: {
  x: number;
  y: number;
  appearAt: number;
  rotation?: number;
  color?: string;
  emoji?: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < appearAt) return null;
  const op = spring({ frame: frame - appearAt, fps, from: 0, to: 1, config: { damping: 12 } });
  const bob = Math.sin((frame - appearAt) / 8) * 8;
  void color;
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) translateY(${bob}px) rotate(${rotation}deg)`,
        opacity: op,
        fontSize: 80,
        pointerEvents: "none",
        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))",
      }}
    >
      {emoji}
    </div>
  );
};
