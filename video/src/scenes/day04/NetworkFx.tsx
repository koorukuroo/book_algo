import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { getLength, getPointAtLength } from "@remotion/paths";

// ─── PacketTrail ──────────────────────────────────────────────────────────
// Packets repeatedly travel along a custom SVG path.
// Path coords are in screen percent (0-100). e.g. "M10,50 L40,50 L40,30 L80,30"
export const PacketTrail = ({
  path,
  color = "#fbb437",
  startFrame = 0,
  durationPerLap = 90,
  packetCount = 3,
  packetSize = 18,
  strokeWidth = 4,
  pathColor = "rgba(13,39,82,0.18)",
  showRoute = true,
}: {
  path: string;
  color?: string;
  startFrame?: number;
  durationPerLap?: number;
  packetCount?: number;
  packetSize?: number;
  strokeWidth?: number;
  pathColor?: string;
  showRoute?: boolean;
}) => {
  const frame = useCurrentFrame();
  const totalLen = getLength(path);
  if (frame < startFrame) return null;
  const local = frame - startFrame;
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {showRoute && (
        <path
          d={path}
          stroke={pathColor}
          strokeWidth={strokeWidth / 10}
          fill="none"
          strokeDasharray="0.6 0.4"
          strokeLinecap="round"
        />
      )}
      {Array.from({ length: packetCount }, (_, i) => {
        const phase = (local + (i * durationPerLap) / packetCount) / durationPerLap;
        const t = phase % 1;
        const pt = getPointAtLength(path, t * totalLen);
        const op = Math.sin(t * Math.PI);
        return (
          <g key={i} transform={`translate(${pt.x} ${pt.y})`}>
            <circle
              r={packetSize / 22}
              fill={color}
              opacity={op * 0.95}
              filter="drop-shadow(0 0.2px 0.4px rgba(0,0,0,0.4))"
            />
          </g>
        );
      })}
    </svg>
  );
};

// ─── DrawLine ──────────────────────────────────────────────────────────────
// Animated line that draws itself from start to end.
export const DrawLine = ({
  from,
  to,
  startFrame = 0,
  durationFrames = 30,
  color = "#0aa6c9",
  width = 4,
  dashed = false,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  startFrame?: number;
  durationFrames?: number;
  color?: string;
  width?: number;
  dashed?: boolean;
}) => {
  const frame = useCurrentFrame();
  if (frame < startFrame) return null;
  const t = Math.min(1, (frame - startFrame) / durationFrames);
  const x = from.x + (to.x - from.x) * t;
  const y = from.y + (to.y - from.y) * t;
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <line
        x1={from.x}
        y1={from.y}
        x2={x}
        y2={y}
        stroke={color}
        strokeWidth={width / 10}
        strokeLinecap="round"
        strokeDasharray={dashed ? "0.8 0.6" : undefined}
      />
    </svg>
  );
};

// ─── PulseNode ──────────────────────────────────────────────────────────────
// A node that pulses concentric rings — perfect for highlighting a server/icon.
export const PulseNode = ({
  x,
  y,
  color = "#0aa6c9",
  size = 60,
  startFrame = 0,
  rings = 3,
}: {
  x: number;
  y: number;
  color?: string;
  size?: number;
  startFrame?: number;
  rings?: number;
}) => {
  const frame = useCurrentFrame();
  if (frame < startFrame) return null;
  const local = frame - startFrame;
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: rings }, (_, i) => {
        const period = 60;
        const phase = ((local + (i * period) / rings) % period) / period;
        const ringSize = size + phase * size * 2.5;
        const op = (1 - phase) * 0.6;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: ringSize,
              height: ringSize,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: `${Math.max(2, size * 0.04)}px solid ${color}`,
              opacity: op,
            }}
          />
        );
      })}
    </div>
  );
};

// ─── BuildUpBox ─────────────────────────────────────────────────────────────
// A subnet-like rectangle that fades+scales in at a specific frame.
export const BuildUpBox = ({
  x,
  y,
  width,
  height,
  appearAt,
  label,
  color = "rgba(10,166,201,0.15)",
  borderColor = "#0aa6c9",
  labelColor = "#0d2752",
  rotation = 0,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  appearAt: number;
  label?: string;
  color?: string;
  borderColor?: string;
  labelColor?: string;
  rotation?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < appearAt) return null;
  const scale = spring({
    frame: frame - appearAt,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 120 },
  });
  const op = interpolate(frame - appearAt, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
        opacity: op,
        background: color,
        border: `3px dashed ${borderColor}`,
        borderRadius: 12,
        pointerEvents: "none",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      {label && (
        <div
          style={{
            position: "absolute",
            top: -28,
            background: borderColor,
            color: labelColor === "#0d2752" ? "white" : labelColor,
            fontFamily: "Gowun Dodum, sans-serif",
            fontWeight: 700,
            fontSize: 22,
            padding: "4px 14px",
            borderRadius: 6,
            letterSpacing: -0.5,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

// ─── CountUp ────────────────────────────────────────────────────────────────
// Animated number counter — for KPI/stat reveals.
export const CountUp = ({
  x,
  y,
  from,
  to,
  startFrame,
  durationFrames = 60,
  prefix = "",
  suffix = "",
  color = "#0d2752",
  fontSize = 96,
}: {
  x: number;
  y: number;
  from: number;
  to: number;
  startFrame: number;
  durationFrames?: number;
  prefix?: string;
  suffix?: string;
  color?: string;
  fontSize?: number;
}) => {
  const frame = useCurrentFrame();
  if (frame < startFrame) return null;
  const t = Math.min(1, (frame - startFrame) / durationFrames);
  // ease-out
  const eased = 1 - Math.pow(1 - t, 3);
  const value = Math.round(from + (to - from) * eased);
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        fontFamily: "Gaegu, sans-serif",
        fontSize,
        fontWeight: 900,
        color,
        textShadow: "0 6px 16px rgba(13,39,82,0.25)",
        pointerEvents: "none",
        letterSpacing: -2,
      }}
    >
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </div>
  );
};

// ─── ScanLine ───────────────────────────────────────────────────────────────
// Tech-blueprint scanning line that slowly sweeps top→bottom (like a scanner).
export const ScanLine = ({
  startFrame = 0,
  durationFrames = 240,
  color = "#0aa6c9",
}: {
  startFrame?: number;
  durationFrames?: number;
  color?: string;
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [startFrame, startFrame + durationFrames], [-10, 110], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: `${t}%`,
        left: 0,
        right: 0,
        height: 80,
        pointerEvents: "none",
        background: `linear-gradient(180deg, transparent, ${color}55, transparent)`,
        opacity: 0.7,
      }}
    />
  );
};

// ─── GridOverlay ────────────────────────────────────────────────────────────
// Subtle blueprint grid background.
export const GridOverlay = ({
  color = "rgba(13,39,82,0.06)",
  gridSize = 40,
  opacity = 1,
}: {
  color?: string;
  gridSize?: number;
  opacity?: number;
}) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      opacity,
      backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
      backgroundSize: `${gridSize}px ${gridSize}px`,
    }}
  />
);

// ─── TypewriterLine ─────────────────────────────────────────────────────────
// Reveals text character-by-character.
export const TypewriterLine = ({
  text,
  x,
  y,
  startFrame,
  cps = 20,
  color = "#0d2752",
  fontSize = 36,
  bg = "rgba(255,255,255,0.92)",
  fontFamily = "Gowun Dodum, sans-serif",
  fontWeight = 600,
  maxWidthPx = 800,
}: {
  text: string;
  x: number;
  y: number;
  startFrame: number;
  cps?: number;
  color?: string;
  fontSize?: number;
  bg?: string;
  fontFamily?: string;
  fontWeight?: number;
  maxWidthPx?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < startFrame) return null;
  const charsToShow = Math.floor(((frame - startFrame) / fps) * cps);
  const visible = text.slice(0, Math.min(text.length, charsToShow));
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        fontFamily,
        fontWeight,
        fontSize,
        color,
        background: bg,
        padding: "10px 20px",
        borderRadius: 10,
        pointerEvents: "none",
        maxWidth: maxWidthPx,
        textAlign: "center",
        boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
      }}
    >
      {visible}
      {visible.length < text.length && <span style={{ opacity: 0.55 }}>▍</span>}
    </div>
  );
};

// ─── BlockReveal ────────────────────────────────────────────────────────────
// A rectangle that wipes from one side to reveal what's underneath/its content.
export const BlockReveal = ({
  x,
  y,
  width,
  height,
  appearAt,
  durationFrames = 30,
  color = "#0d2752",
  direction = "left-to-right",
  children,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  appearAt: number;
  durationFrames?: number;
  color?: string;
  direction?: "left-to-right" | "right-to-left" | "top-to-bottom";
  children?: React.ReactNode;
}) => {
  const frame = useCurrentFrame();
  if (frame < appearAt) return null;
  const t = Math.min(1, (frame - appearAt) / durationFrames);
  let clip = "";
  if (direction === "left-to-right") clip = `inset(0 ${100 - t * 100}% 0 0)`;
  else if (direction === "right-to-left") clip = `inset(0 0 0 ${100 - t * 100}%)`;
  else clip = `inset(0 0 ${100 - t * 100}% 0)`;
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
        transform: "translate(-50%, -50%)",
        background: color,
        clipPath: clip,
        WebkitClipPath: clip,
        pointerEvents: "none",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};

// ─── BarrierBlock ───────────────────────────────────────────────────────────
// Big red X / barrier symbol — for showing security blocks.
export const BarrierBlock = ({
  x,
  y,
  appearAt,
  size = 120,
  color = "#d65a4f",
}: {
  x: number;
  y: number;
  appearAt: number;
  size?: number;
  color?: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < appearAt) return null;
  const scale = spring({
    frame: frame - appearAt,
    fps,
    from: 0,
    to: 1,
    config: { damping: 9, stiffness: 160 },
  });
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(45deg)`,
        background: color,
        borderRadius: 12,
        border: `4px solid white`,
        boxShadow: `0 0 0 4px ${color}88, 0 12px 30px rgba(214,90,79,0.45)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.6,
        color: "white",
        fontWeight: 900,
        pointerEvents: "none",
      }}
    >
      <span style={{ transform: "rotate(-45deg)" }}>✕</span>
    </div>
  );
};
