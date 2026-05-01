import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { solo7, solo7Fonts } from "./style";

export const TrapScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  // Stage 1: pick #2 quickly
  const arrowOp = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });
  const heartScale = spring({ frame: frame - 80, fps, from: 0, to: 1, config: { damping: 7 } });
  // Stage 2: realize others were better
  const xScale = spring({ frame: frame - 240, fps, from: 0, to: 1.2, config: { damping: 10 } });
  const regretOp = interpolate(frame, [320, 380], [0, 1], { extrapolateRight: "clamp" });

  const cards = Array.from({ length: 7 }, (_, i) => {
    const isPicked = i === 1;
    const dimAfter = frame > 240 && !isPicked;
    return { num: i + 1, isPicked, dimAfter };
  });

  return (
    <AbsoluteFill
      style={{
        background: solo7.bg,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "50px 60px 60px",
        gap: 40,
      }}
    >
      <div
        style={{
          fontFamily: solo7Fonts.display,
          fontSize: 76,
          color: solo7.ink,
          opacity: titleOp,
          textAlign: "center",
        }}
      >
        흔한 실수: <span style={{ color: solo7.pink }}>첫인상 고정</span>
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "flex-end",
          position: "relative",
          marginTop: 40,
        }}
      >
        {cards.map((c) => (
          <div
            key={c.num}
            style={{
              width: 130,
              height: 180,
              borderRadius: 16,
              border: c.isPicked
                ? `5px solid ${solo7.pink}`
                : `4px solid ${solo7.line}`,
              background: c.dimAfter
                ? "rgba(200,200,200,0.4)"
                : c.isPicked
                ? solo7.pinkSoft
                : "white",
              boxShadow: c.isPicked ? `6px 6px 0 ${solo7.pink}` : `4px 4px 0 ${solo7.line}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: solo7Fonts.display,
              fontSize: 60,
              color: c.dimAfter ? solo7.muted : solo7.ink,
              fontWeight: 700,
              position: "relative",
              opacity: c.dimAfter ? 0.45 : 1,
            }}
          >
            {c.num}
            {c.isPicked && (
              <div
                style={{
                  position: "absolute",
                  top: -50,
                  fontSize: 70,
                  transform: `scale(${heartScale})`,
                }}
              >
                ❤️
              </div>
            )}
            {!c.isPicked && c.dimAfter && (
              <div
                style={{
                  fontSize: 26,
                  fontFamily: solo7Fonts.body,
                  color: solo7.muted,
                  marginTop: 8,
                }}
              >
                ?
              </div>
            )}
          </div>
        ))}

        {/* Big arrow stamping at #2 */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: 130,
            opacity: arrowOp,
            fontFamily: solo7Fonts.display,
            fontSize: 56,
            color: solo7.pink,
            transform: "rotate(15deg)",
          }}
        >
          이 사람이다!
        </div>

        {/* X stamp on whole row after frame 240 */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${xScale}) rotate(-10deg)`,
            fontSize: 320,
            color: solo7.pink,
            fontWeight: 900,
            opacity: 0.85,
            pointerEvents: "none",
          }}
        >
          ✕
        </div>
      </div>

      <div
        style={{
          opacity: regretOp,
          fontFamily: solo7Fonts.body,
          fontSize: 36,
          color: solo7.inkSoft,
          textAlign: "center",
          maxWidth: 1400,
          lineHeight: 1.5,
          background: "white",
          padding: "20px 40px",
          borderRadius: 16,
          border: `3px dashed ${solo7.pink}`,
          marginTop: 30,
        }}
      >
        뒷사람을 평가할 <strong style={{ color: solo7.pink }}>비교 기준</strong>이
        없으면, 선택은 늘 후회로 끝납니다 😢
      </div>
    </AbsoluteFill>
  );
};
