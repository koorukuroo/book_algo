import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { solo7, solo7Fonts } from "./style";

const HEARTS = ["💖", "💗", "💘", "💕", "💝"];

export const TitleScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, from: 0.4, to: 1, config: { damping: 9, stiffness: 130 } });
  const subOp = interpolate(frame, [40, 80], [0, 1], { extrapolateRight: "clamp" });
  const tagOp = interpolate(frame, [110, 160], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 30%, ${solo7.pinkSoft} 0%, ${solo7.bg} 50%, ${solo7.bgSoft} 100%)`,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        gap: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating hearts */}
      {HEARTS.map((h, i) => {
        const driftY = interpolate(
          (frame + i * 30) % 240,
          [0, 240],
          [40, -40],
        );
        const op = interpolate(frame, [0, 30], [0, 0.7], { extrapolateRight: "clamp" });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${10 + i * 18}%`,
              top: `${15 + (i % 2) * 60}%`,
              fontSize: 60 + i * 8,
              opacity: op,
              transform: `translateY(${driftY}px) rotate(${(i - 2) * 8}deg)`,
            }}
          >
            {h}
          </div>
        );
      })}

      <div
        style={{
          fontFamily: solo7Fonts.body,
          fontSize: 28,
          color: solo7.muted,
          letterSpacing: 6,
          textTransform: "uppercase",
          opacity: subOp,
          background: "white",
          padding: "8px 24px",
          borderRadius: 999,
          border: `2px solid ${solo7.pink}`,
        }}
      >
        SOLO · 알고리즘 특집
      </div>

      <div
        style={{
          fontFamily: solo7Fonts.display,
          fontSize: 220,
          color: solo7.pink,
          lineHeight: 1,
          transform: `scale(${titleScale})`,
          textShadow: `8px 8px 0 ${solo7.gold}`,
          letterSpacing: -4,
          zIndex: 2,
        }}
      >
        나는 솔로의 수학
      </div>

      <div
        style={{
          fontFamily: solo7Fonts.body,
          fontSize: 48,
          color: solo7.ink,
          opacity: tagOp,
          background: "white",
          padding: "16px 40px",
          borderRadius: 24,
          border: `4px solid ${solo7.ink}`,
          boxShadow: `8px 8px 0 ${solo7.ink}`,
          marginTop: 20,
          zIndex: 2,
        }}
      >
        <span style={{ color: solo7.pink, fontWeight: 700 }}>7명</span> 중{" "}
        <span style={{ color: solo7.gold, fontWeight: 700 }}>1명</span>, 어떤 전략?
      </div>
    </AbsoluteFill>
  );
};
