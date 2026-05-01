import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { solo7, solo7Fonts } from "./style";

// 7-card timeline: first 2 marked "관찰", cards 3-7 highlight one by one
// then a spotlight lands on #4 (illustration of "found a candidate above bar")
export const AlgorithmScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOp = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const observeBarOp = interpolate(frame, [60, 110], [0, 1], { extrapolateRight: "clamp" });
  const decideBarOp = interpolate(frame, [180, 230], [0, 1], { extrapolateRight: "clamp" });

  // Spotlight scan from card 3 to card 4
  const cardScanIdx = Math.min(3, Math.max(2, Math.floor(interpolate(frame, [340, 480], [2, 4]))));
  const pickedScale = spring({
    frame: frame - 540,
    fps,
    from: 0,
    to: 1,
    config: { damping: 8 },
  });
  const PICK_INDEX = 3; // card #4

  return (
    <AbsoluteFill
      style={{
        background: solo7.bg,
        padding: 60,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
      }}
    >
      <div
        style={{
          fontFamily: solo7Fonts.display,
          fontSize: 88,
          color: solo7.ink,
          opacity: labelOp,
          lineHeight: 1.1,
          textAlign: "center",
        }}
      >
        <span style={{ color: solo7.pink }}>37%</span> 법칙 적용
      </div>
      <div
        style={{
          fontFamily: solo7Fonts.body,
          fontSize: 30,
          color: solo7.muted,
          opacity: labelOp,
        }}
      >
        7명 × 0.37 ≈ 2.6명 → 처음 2명 관찰
      </div>

      {/* The 7-card timeline */}
      <div
        style={{
          display: "flex",
          gap: 18,
          alignItems: "flex-end",
          marginTop: 30,
          position: "relative",
        }}
      >
        {Array.from({ length: 7 }, (_, i) => {
          const isObserve = i < 2;
          const isPicked = frame > 540 && i === PICK_INDEX;
          const isCurrent = i === cardScanIdx && frame >= 340 && frame < 540;
          const isDimmedAfter = frame > 540 && !isPicked && i >= 2;
          return (
            <div
              key={i}
              style={{
                width: 160,
                height: 220,
                borderRadius: 18,
                background: isObserve
                  ? "rgba(255,255,255,0.5)"
                  : isPicked
                  ? solo7.pinkSoft
                  : isDimmedAfter
                  ? "rgba(255,255,255,0.5)"
                  : "white",
                border: isPicked
                  ? `6px solid ${solo7.pink}`
                  : isCurrent
                  ? `5px solid ${solo7.gold}`
                  : isObserve
                  ? `4px dashed ${solo7.muted}`
                  : `4px solid ${solo7.line}`,
                boxShadow: isPicked
                  ? `8px 8px 0 ${solo7.pink}`
                  : isCurrent
                  ? `0 0 0 8px ${solo7.goldSoft}`
                  : "none",
                fontFamily: solo7Fonts.display,
                fontSize: 64,
                color: isObserve ? solo7.muted : isPicked ? solo7.pink : solo7.ink,
                fontWeight: 700,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                position: "relative",
                opacity: isDimmedAfter ? 0.4 : 1,
                transition: "all 80ms ease",
              }}
            >
              {i + 1}
              {isObserve && (
                <div
                  style={{
                    fontSize: 22,
                    fontFamily: solo7Fonts.body,
                    color: solo7.muted,
                    fontWeight: 400,
                  }}
                >
                  👀 관찰만
                </div>
              )}
              {isPicked && (
                <div
                  style={{
                    position: "absolute",
                    top: -55,
                    fontSize: 70,
                    transform: `scale(${pickedScale})`,
                  }}
                >
                  ❤️
                </div>
              )}
            </div>
          );
        })}

        {/* Vertical separator between #2 and #3 */}
        <div
          style={{
            position: "absolute",
            left: `calc(${(2 / 7) * 100}% - 2px)`,
            top: -20,
            bottom: -20,
            width: 4,
            background: solo7.gold,
            borderRadius: 2,
            opacity: decideBarOp,
          }}
        />
      </div>

      {/* Stage labels */}
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: 1500,
          marginTop: 20,
          gap: 20,
        }}
      >
        <div
          style={{
            flex: 2,
            opacity: observeBarOp,
            background: solo7.bgSoft,
            border: `3px dashed ${solo7.muted}`,
            borderRadius: 16,
            padding: "16px 24px",
            textAlign: "center",
            fontFamily: solo7Fonts.display,
            fontSize: 32,
            color: solo7.inkSoft,
          }}
        >
          탐색 — 내 기준 발견하기
        </div>
        <div
          style={{
            flex: 5,
            opacity: decideBarOp,
            background: solo7.pinkSoft,
            border: `4px solid ${solo7.pink}`,
            borderRadius: 16,
            padding: "16px 24px",
            textAlign: "center",
            fontFamily: solo7Fonts.display,
            fontSize: 32,
            color: solo7.pink,
            fontWeight: 700,
          }}
        >
          결단 — 기준을 넘는 첫 번째!
        </div>
      </div>
    </AbsoluteFill>
  );
};
