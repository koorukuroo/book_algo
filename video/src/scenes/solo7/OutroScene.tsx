import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { solo7, solo7Fonts } from "./style";

const STEPS = [
  { num: "①", title: "처음 2명은 관찰", emoji: "👀", color: solo7.sky },
  { num: "②", title: "3번째부터 결단", emoji: "🎯", color: solo7.gold },
  { num: "③", title: "호감도 × 상호성", emoji: "💑", color: solo7.mint },
  { num: "④", title: "마지막엔 내 마음", emoji: "💗", color: solo7.pink },
];

export const OutroScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const cardSpawn = STEPS.map((_, i) =>
    spring({ frame: frame - (40 + i * 30), fps, from: 0, to: 1, config: { damping: 11 } }),
  );
  const closingOp = interpolate(frame, [240, 300], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${solo7.pinkSoft}, ${solo7.bg} 60%, ${solo7.goldSoft})`,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 50,
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
        }}
      >
        나는 솔로 알고리즘 <span style={{ color: solo7.pink }}>4단계</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
          maxWidth: 1500,
          width: "100%",
          marginTop: 20,
        }}
      >
        {STEPS.map((s, i) => (
          <div
            key={i}
            style={{
              transform: `scale(${cardSpawn[i]})`,
              opacity: cardSpawn[i],
              background: "white",
              borderRadius: 24,
              border: `5px solid ${s.color}`,
              padding: "30px 36px",
              boxShadow: `8px 8px 0 ${s.color}`,
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div
              style={{
                fontFamily: solo7Fonts.display,
                fontSize: 80,
                color: s.color,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              {s.num}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: solo7Fonts.display,
                  fontSize: 44,
                  color: solo7.ink,
                  lineHeight: 1.2,
                }}
              >
                {s.title}
              </div>
            </div>
            <div style={{ fontSize: 70 }}>{s.emoji}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          opacity: closingOp,
          marginTop: 30,
          fontFamily: solo7Fonts.display,
          fontSize: 48,
          color: solo7.ink,
          textAlign: "center",
          maxWidth: 1500,
          lineHeight: 1.4,
        }}
      >
        사랑은 <span style={{ color: solo7.pink }}>최적화에 실패할 자유</span>까지 포함하는 게임 💕
      </div>
    </AbsoluteFill>
  );
};
