import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../../theme";

// Two-column "interval determines strategy" layout that animates a pointer
// sliding along a life-timeline.
export const IntervalScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const stuccioOp = interpolate(frame, [120, 180], [0, 1], { extrapolateRight: "clamp" });

  // Timeline pointer animates between "early" and "late" twice
  const tPos = interpolate(
    frame,
    [400, 600, 800, 1000],
    [0.05, 0.95, 0.05, 0.95],
    { extrapolateRight: "clamp" },
  );

  const finalOp = interpolate(frame, [1010, 1070], [0, 1], { extrapolateRight: "clamp" });
  const finalScale = spring({
    frame: frame - 1010,
    fps,
    from: 0.6,
    to: 1,
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        padding: "60px 80px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
      }}
    >
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 72,
          color: theme.ink,
          opacity: titleOp,
        }}
      >
        ⏳ 인터벌이 전략을 결정한다
      </div>

      {/* Stucchio quote */}
      <div
        style={{
          opacity: stuccioOp,
          maxWidth: 1400,
          background: theme.bgSoft,
          padding: "24px 40px",
          borderLeft: `8px solid ${theme.mint}`,
          borderRadius: 16,
          fontFamily: fonts.body,
          fontSize: 28,
          color: theme.inkSoft,
          lineHeight: 1.5,
        }}
      >
        <span style={{ color: theme.muted, fontFamily: fonts.display, fontSize: 24, letterSpacing: 4, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
          크리스 스투치오
        </span>
        "뉴욕을 곧 떠날 때는 단골 식당만 갔다.<br />
        인도 푸네에 막 도착했을 때는 죽지 않을 곳이라면 어디든 갔다."
      </div>

      {/* Life timeline */}
      <div
        style={{
          width: "100%",
          maxWidth: 1500,
          marginTop: 30,
          position: "relative",
          height: 160,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 60,
            height: 24,
            background: `linear-gradient(90deg, ${theme.accent} 0%, ${theme.sun} 50%, ${theme.mint} 100%)`,
            borderRadius: 12,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "5%",
            top: 0,
            fontFamily: fonts.display,
            fontSize: 36,
            color: theme.accent,
            fontWeight: 700,
          }}
        >
          탐색 (Explore)
        </div>
        <div
          style={{
            position: "absolute",
            right: "5%",
            top: 0,
            fontFamily: fonts.display,
            fontSize: 36,
            color: theme.mint,
            fontWeight: 700,
          }}
        >
          활용 (Exploit)
        </div>
        <div
          style={{
            position: "absolute",
            left: `calc(${tPos * 100}% - 30px)`,
            top: 30,
            fontSize: 90,
            transition: "left 200ms linear",
          }}
        >
          🚶
        </div>
        <div
          style={{
            position: "absolute",
            left: "5%",
            bottom: 0,
            fontFamily: fonts.body,
            fontSize: 22,
            color: theme.muted,
          }}
        >
          ← 인생 초반
        </div>
        <div
          style={{
            position: "absolute",
            right: "5%",
            bottom: 0,
            fontFamily: fonts.body,
            fontSize: 22,
            color: theme.muted,
          }}
        >
          인생 후반 →
        </div>
      </div>

      <div
        style={{
          opacity: finalOp,
          transform: `scale(${finalScale})`,
          marginTop: 20,
          fontFamily: fonts.display,
          fontSize: 52,
          color: theme.ink,
          textAlign: "center",
          maxWidth: 1300,
          lineHeight: 1.3,
        }}
      >
        나이가 아니라 <span style={{ color: theme.accent }}>남은 시간</span>이 결정한다
      </div>
    </AbsoluteFill>
  );
};
