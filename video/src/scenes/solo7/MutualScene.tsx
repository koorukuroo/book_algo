import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { solo7, solo7Fonts } from "./style";

// 2D scatter: x = 호감도, y = 상호성. Three named candidates plotted.
const CANDIDATES = [
  { name: "A", crush: 95, mutual: 10, color: solo7.pink, label: "환상", emoji: "💔" },
  { name: "B", crush: 82, mutual: 70, color: solo7.gold, label: "현실 베스트", emoji: "💖" },
  { name: "C", crush: 70, mutual: 95, color: solo7.sky, label: "안정형", emoji: "🤝" },
];

// Plot box geometry
const PLOT = { x: 240, y: 200, w: 1200, h: 600 };
const px = (crush: number) => PLOT.x + (crush / 100) * PLOT.w;
const py = (mut: number) => PLOT.y + PLOT.h - (mut / 100) * PLOT.h;

export const MutualScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const axesOp = interpolate(frame, [40, 80], [0, 1], { extrapolateRight: "clamp" });
  const dotOps = CANDIDATES.map((_, i) =>
    spring({ frame: frame - (160 + i * 60), fps, from: 0, to: 1, config: { damping: 11 } }),
  );
  const sweetSpotOp = interpolate(frame, [400, 460], [0, 1], { extrapolateRight: "clamp" });
  const formulaOp = interpolate(frame, [550, 610], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: solo7.bg, padding: 50 }}>
      <div
        style={{
          fontFamily: solo7Fonts.display,
          fontSize: 64,
          color: solo7.ink,
          opacity: titleOp,
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        함정 — <span style={{ color: solo7.pink }}>상대도 나를</span> 골라야 한다
      </div>

      <svg viewBox="0 0 1820 980" style={{ width: "100%", height: "auto" }}>
        {/* Axes */}
        <g opacity={axesOp}>
          <line
            x1={PLOT.x}
            y1={PLOT.y + PLOT.h}
            x2={PLOT.x + PLOT.w}
            y2={PLOT.y + PLOT.h}
            stroke={solo7.ink}
            strokeWidth={4}
          />
          <line
            x1={PLOT.x}
            y1={PLOT.y}
            x2={PLOT.x}
            y2={PLOT.y + PLOT.h}
            stroke={solo7.ink}
            strokeWidth={4}
          />
          {/* Axis labels */}
          <text
            x={PLOT.x + PLOT.w / 2}
            y={PLOT.y + PLOT.h + 60}
            fontFamily={solo7Fonts.display}
            fontSize={36}
            fill={solo7.ink}
            textAnchor="middle"
          >
            호감도 (내 마음) →
          </text>
          <text
            x={-(PLOT.y + PLOT.h / 2)}
            y={PLOT.x - 80}
            fontFamily={solo7Fonts.display}
            fontSize={36}
            fill={solo7.ink}
            textAnchor="middle"
            transform="rotate(-90)"
          >
            ↑ 상호성 (상대 마음)
          </text>
          {/* Tick marks */}
          {[0, 50, 100].map((v) => (
            <g key={v}>
              <text
                x={px(v)}
                y={PLOT.y + PLOT.h + 30}
                fontFamily={solo7Fonts.body}
                fontSize={22}
                fill={solo7.muted}
                textAnchor="middle"
              >
                {v}
              </text>
              <text
                x={PLOT.x - 30}
                y={py(v) + 8}
                fontFamily={solo7Fonts.body}
                fontSize={22}
                fill={solo7.muted}
                textAnchor="end"
              >
                {v}
              </text>
            </g>
          ))}
        </g>

        {/* Sweet-spot region (top-right quadrant where both are high) */}
        <rect
          x={px(70)}
          y={py(100)}
          width={PLOT.w - (px(70) - PLOT.x)}
          height={py(60) - py(100)}
          fill={solo7.goldSoft}
          opacity={sweetSpotOp * 0.6}
          rx={12}
        />
        <text
          x={px(85)}
          y={py(90)}
          fontFamily={solo7Fonts.display}
          fontSize={36}
          fill={solo7.gold}
          textAnchor="middle"
          opacity={sweetSpotOp}
          fontWeight="bold"
        >
          ⭐ Sweet Spot
        </text>

        {/* Candidate dots */}
        {CANDIDATES.map((c, i) => (
          <g key={c.name} opacity={dotOps[i]}>
            <circle
              cx={px(c.crush)}
              cy={py(c.mutual)}
              r={36 * dotOps[i]}
              fill={c.color}
              stroke={solo7.ink}
              strokeWidth={4}
            />
            <text
              x={px(c.crush)}
              y={py(c.mutual) + 12}
              fontFamily={solo7Fonts.display}
              fontSize={36}
              fill="white"
              textAnchor="middle"
              fontWeight="bold"
            >
              {c.name}
            </text>
            <text
              x={px(c.crush)}
              y={py(c.mutual) - 56}
              fontFamily={solo7Fonts.display}
              fontSize={28}
              fill={c.color}
              textAnchor="middle"
              fontWeight="bold"
            >
              {c.emoji} {c.label}
            </text>
            <text
              x={px(c.crush)}
              y={py(c.mutual) + 72}
              fontFamily={solo7Fonts.body}
              fontSize={20}
              fill={solo7.inkSoft}
              textAnchor="middle"
            >
              {c.crush}점 · {c.mutual}%
            </text>
          </g>
        ))}
      </svg>

      <div
        style={{
          opacity: formulaOp,
          marginTop: 20,
          marginInline: "auto",
          fontFamily: solo7Fonts.display,
          fontSize: 56,
          color: solo7.ink,
          background: "white",
          padding: "20px 60px",
          borderRadius: 20,
          border: `4px solid ${solo7.gold}`,
          boxShadow: `8px 8px 0 ${solo7.gold}`,
          textAlign: "center",
        }}
      >
        선택 = <span style={{ color: solo7.pink }}>호감도</span>{" "}
        × <span style={{ color: solo7.sky }}>상호성</span>
      </div>
    </AbsoluteFill>
  );
};
