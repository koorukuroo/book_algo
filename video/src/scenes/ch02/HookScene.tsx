import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../../theme";

export const HookScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const imgScale = spring({ frame: frame - 20, fps, from: 0.85, to: 1, config: { damping: 14 } });
  const left = interpolate(frame, [120, 170], [0, 1], { extrapolateRight: "clamp" });
  const right = interpolate(frame, [220, 270], [0, 1], { extrapolateRight: "clamp" });
  const versus = interpolate(frame, [320, 360], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        padding: "60px 80px",
        flexDirection: "row",
        gap: 60,
        alignItems: "center",
      }}
    >
      <div style={{ flex: "0 0 460px", transform: `scale(${imgScale})` }}>
        <div
          style={{
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            border: `4px solid ${theme.ink}`,
            boxShadow: `10px 10px 0 ${theme.ink}`,
            aspectRatio: "9 / 16",
          }}
        >
          <Img
            src={staticFile("images/webtoons-v/ch02.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 30 }}>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 28,
            color: theme.muted,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: titleOp,
          }}
        >
          매일 마주치는 딜레마
        </div>
        <div style={{ display: "flex", gap: 40, alignItems: "stretch" }}>
          <Card
            opacity={left}
            color={theme.mint}
            label="활용 (Exploit)"
            emoji="🍙"
            title="단골 식당"
            sub="익숙한 만족"
          />
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: 80,
              color: theme.muted,
              opacity: versus,
              alignSelf: "center",
            }}
          >
            vs
          </div>
          <Card
            opacity={right}
            color={theme.accent}
            label="탐색 (Explore)"
            emoji="🍜"
            title="새 태국집"
            sub="미지의 가능성"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Card = ({
  opacity,
  color,
  label,
  emoji,
  title,
  sub,
}: {
  opacity: number;
  color: string;
  label: string;
  emoji: string;
  title: string;
  sub: string;
}) => (
  <div
    style={{
      flex: 1,
      opacity,
      background: "white",
      border: `4px solid ${color}`,
      borderRadius: 24,
      padding: "30px 24px",
      textAlign: "center",
      boxShadow: `8px 8px 0 ${color}`,
    }}
  >
    <div style={{ fontSize: 80 }}>{emoji}</div>
    <div
      style={{
        fontFamily: fonts.body,
        fontSize: 22,
        color,
        fontWeight: 700,
        letterSpacing: 3,
        textTransform: "uppercase",
        marginTop: 10,
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontFamily: fonts.display,
        fontSize: 48,
        color: theme.ink,
        marginTop: 8,
      }}
    >
      {title}
    </div>
    <div style={{ fontFamily: fonts.body, fontSize: 28, color: theme.muted, marginTop: 6 }}>
      {sub}
    </div>
  </div>
);
