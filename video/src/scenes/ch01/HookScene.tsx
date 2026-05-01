import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme, fonts } from "../../theme";

export const HookScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const imgEntry = spring({ frame: frame - 30, fps, from: 0, to: 1, config: { damping: 14 } });
  const lineTwoOp = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const lineThreeOp = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        padding: "80px 100px",
        flexDirection: "row",
        gap: 80,
        alignItems: "center",
      }}
    >
      <div style={{ flex: 1, opacity: fadeIn }}>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 28,
            color: theme.muted,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 30,
          }}
        >
          시나리오
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 72,
            color: theme.ink,
            lineHeight: 1.25,
            marginBottom: 30,
          }}
        >
          샌프란시스코에서 <br />
          <span style={{ color: theme.accent }}>아파트</span>를 구한다고 <br />
          상상해 보세요.
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 38,
            color: theme.inkSoft,
            lineHeight: 1.5,
            opacity: lineTwoOp,
          }}
        >
          매물은 분 단위로 사라지고,
          <br />
          공개 하우스는 사람으로 미어터집니다.
        </div>
        <div
          style={{
            marginTop: 40,
            fontFamily: fonts.display,
            fontSize: 48,
            color: theme.ink,
            opacity: lineThreeOp,
          }}
        >
          충분히 봤는가? <span style={{ color: theme.accent }}>더 봐야 하는가?</span>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          transform: `scale(${imgEntry}) rotate(${(1 - imgEntry) * -4}deg)`,
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: 32,
            overflow: "hidden",
            border: `4px solid ${theme.ink}`,
            boxShadow: `12px 12px 0 ${theme.ink}`,
            aspectRatio: "1 / 1",
            background: "white",
          }}
        >
          <Img
            src={staticFile("images/webtoons/ch01.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
