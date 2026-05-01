import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { solo7, solo7Fonts } from "./style";

// Balance scale: brain (확률) on left, heart (마음) on right.
// Heart wins — it dips down — accompanied by a key sentence.
export const OverrideScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" });
  // Balance starts level then tips toward heart (right)
  const tilt = interpolate(frame, [120, 280], [0, -8], { extrapolateRight: "clamp" });
  const heartScale = spring({ frame: frame - 80, fps, from: 0, to: 1.05, config: { damping: 8 } });
  const brainScale = spring({ frame: frame - 60, fps, from: 0, to: 1, config: { damping: 8 } });
  const verdictOp = interpolate(frame, [340, 420], [0, 1], { extrapolateRight: "clamp" });
  const verdictScale = spring({ frame: frame - 340, fps, from: 0.7, to: 1, config: { damping: 11 } });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 40%, ${solo7.pinkSoft}, ${solo7.bg} 70%)`,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        gap: 30,
      }}
    >
      <div
        style={{
          fontFamily: solo7Fonts.display,
          fontSize: 80,
          color: solo7.ink,
          opacity: titleOp,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        그리고 <span style={{ color: solo7.pink }}>인간 오버라이드</span>
      </div>

      <div
        style={{
          position: "relative",
          width: 1100,
          height: 480,
          marginTop: 20,
        }}
      >
        {/* Pivot post */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 0,
            transform: "translateX(-50%)",
            width: 30,
            height: 280,
            background: solo7.ink,
            borderRadius: 8,
          }}
        />
        {/* Base */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: -10,
            transform: "translateX(-50%)",
            width: 220,
            height: 30,
            background: solo7.ink,
            borderRadius: 12,
          }}
        />

        {/* Beam (rotates) */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 200,
            width: 900,
            height: 14,
            background: solo7.ink,
            borderRadius: 7,
            transform: `translateX(-50%) rotate(${tilt}deg)`,
            transformOrigin: "center center",
          }}
        >
          {/* Left pan: 확률 (brain) */}
          <div
            style={{
              position: "absolute",
              left: 30,
              top: -250,
              width: 320,
              transform: `scale(${brainScale})`,
              transformOrigin: "top center",
            }}
          >
            <div
              style={{
                width: 320,
                height: 260,
                background: "white",
                borderRadius: 24,
                border: `5px solid ${solo7.sky}`,
                boxShadow: `6px 6px 0 ${solo7.sky}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: 18,
                gap: 6,
              }}
            >
              <div style={{ fontSize: 100, lineHeight: 1 }}>🧠</div>
              <div
                style={{
                  fontFamily: solo7Fonts.display,
                  fontSize: 36,
                  color: solo7.sky,
                  fontWeight: 700,
                }}
              >
                확률 계산
              </div>
              <div
                style={{
                  fontFamily: solo7Fonts.body,
                  fontSize: 22,
                  color: solo7.muted,
                  marginTop: 12,
                }}
              >
                점수 / 기댓값 / 시뮬레이션
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: -16,
                transform: "translateX(-50%)",
                width: 12,
                height: 30,
                background: solo7.ink,
              }}
            />
          </div>

          {/* Right pan: 마음 (heart) — wins */}
          <div
            style={{
              position: "absolute",
              right: 30,
              top: -250,
              width: 320,
              transform: `scale(${heartScale})`,
              transformOrigin: "top center",
            }}
          >
            <div
              style={{
                width: 320,
                height: 260,
                background: "white",
                borderRadius: 24,
                border: `6px solid ${solo7.pink}`,
                boxShadow: `8px 8px 0 ${solo7.pink}, 0 0 0 8px ${solo7.pinkSoft}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: 18,
                gap: 6,
              }}
            >
              <div style={{ fontSize: 100, lineHeight: 1 }}>💗</div>
              <div
                style={{
                  fontFamily: solo7Fonts.display,
                  fontSize: 36,
                  color: solo7.pink,
                  fontWeight: 700,
                }}
              >
                내 마음
              </div>
              <div
                style={{
                  fontFamily: solo7Fonts.body,
                  fontSize: 22,
                  color: solo7.muted,
                  marginTop: 12,
                }}
              >
                후회 / 직관 / 자기다움
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: -16,
                transform: "translateX(-50%)",
                width: 12,
                height: 30,
                background: solo7.ink,
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          opacity: verdictOp,
          transform: `scale(${verdictScale})`,
          fontFamily: solo7Fonts.display,
          fontSize: 56,
          color: solo7.pink,
          textAlign: "center",
          maxWidth: 1500,
          lineHeight: 1.3,
          marginTop: 10,
        }}
      >
        결국 — 그 사람 옆에서{" "}
        <span style={{ color: solo7.gold }}>내가 나답게 있을 수 있는가</span>
      </div>
    </AbsoluteFill>
  );
};
