import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { solo7, solo7Fonts } from "./style";

const PEOPLE = [
  { emoji: "👩", color: solo7.sky, name: "1호" },
  { emoji: "👩‍🦰", color: solo7.pink, name: "2호" },
  { emoji: "👩‍🎨", color: solo7.gold, name: "3호" },
  { emoji: "👩‍🦱", color: solo7.mint, name: "4호" },
  { emoji: "👩‍💼", color: solo7.lavender, name: "5호" },
  { emoji: "👩‍🍳", color: solo7.pink, name: "6호" },
  { emoji: "👩‍💻", color: solo7.sky, name: "7호" },
];

export const SetupScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const cardSpawn = PEOPLE.map((_, i) =>
    spring({ frame: frame - (40 + i * 12), fps, from: 0, to: 1, config: { damping: 12 } }),
  );
  const captionOp = interpolate(frame, [180, 240], [0, 1], { extrapolateRight: "clamp" });
  const stampScale = spring({ frame: frame - 240, fps, from: 0, to: 1, config: { damping: 8 } });

  return (
    <AbsoluteFill
      style={{
        background: solo7.bg,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        gap: 50,
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
        오늘의 출연자 <span style={{ color: solo7.pink }}>7인</span>
      </div>

      <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
        {PEOPLE.map((p, i) => (
          <div
            key={i}
            style={{
              transform: `scale(${cardSpawn[i]}) translateY(${(1 - cardSpawn[i]) * 80}px)`,
              opacity: cardSpawn[i],
              width: 180,
              height: 240,
              background: "white",
              borderRadius: 20,
              border: `5px solid ${p.color}`,
              boxShadow: `6px 6px 0 ${solo7.ink}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              position: "relative",
            }}
          >
            <div style={{ fontSize: 100 }}>{p.emoji}</div>
            <div
              style={{
                fontFamily: solo7Fonts.display,
                fontSize: 36,
                color: p.color,
                fontWeight: 700,
              }}
            >
              {p.name}
            </div>
            <div
              style={{
                position: "absolute",
                top: -15,
                right: -15,
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: solo7.gold,
                color: "white",
                fontFamily: solo7Fonts.display,
                fontSize: 28,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `3px solid ${solo7.ink}`,
              }}
            >
              {i + 1}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          opacity: captionOp,
          fontFamily: solo7Fonts.body,
          fontSize: 38,
          color: solo7.inkSoft,
          textAlign: "center",
          maxWidth: 1400,
          lineHeight: 1.5,
        }}
      >
        한 번 패스한 사람은 다시 못 골라요.
        <br />
        <span style={{ fontWeight: 700, color: solo7.pink }}>단 1명</span>을 정해야 합니다.
      </div>

      <div
        style={{
          position: "absolute",
          right: 100,
          top: 80,
          transform: `scale(${stampScale}) rotate(-12deg)`,
          fontFamily: solo7Fonts.display,
          fontSize: 60,
          color: solo7.pink,
          padding: "16px 40px",
          border: `8px double ${solo7.pink}`,
          borderRadius: 12,
          background: "rgba(255,255,255,0.7)",
        }}
      >
        ❤️ 최종 선택
      </div>
    </AbsoluteFill>
  );
};
