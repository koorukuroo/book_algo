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

// Two stories shown back-to-back inside a 1380-frame block (46s)
// Narration:  0 → 21s (630f)  Kepler
//            21 → 46s (750f)  Michael Trick
export const StoriesScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < 630) {
    return <KeplerStory frame={frame} fps={fps} />;
  }
  return <TrickStory frame={frame - 630} fps={fps} />;
};

const KeplerStory = ({ frame, fps }: { frame: number; fps: number }) => {
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const imgScale = spring({ frame: frame - 30, fps, from: 0.7, to: 1, config: { damping: 14 } });
  const fade = interpolate(frame, [600, 630], [1, 0], { extrapolateRight: "clamp" });
  const lineOp = interpolate(frame, [120, 180], [0, 1], { extrapolateRight: "clamp" });
  const punchOp = interpolate(frame, [380, 440], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        padding: "60px 80px",
        flexDirection: "row",
        gap: 80,
        alignItems: "center",
        opacity: fade,
      }}
    >
      <div
        style={{
          flex: "0 0 460px",
          transform: `scale(${imgScale})`,
        }}
      >
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
            src={staticFile("images/webtoons-v/ch01.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 28,
            color: theme.muted,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: titleOpacity,
            marginBottom: 20,
          }}
        >
          Story · 1611
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 110,
            color: theme.ink,
            lineHeight: 1,
            opacity: titleOpacity,
            marginBottom: 30,
          }}
        >
          케플러의 결혼
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 38,
            color: theme.inkSoft,
            lineHeight: 1.5,
            opacity: lineOp,
            marginBottom: 30,
          }}
        >
          첫 부인 사망 후, 천문학자는 11명의 후보를 차례로 만났습니다.
          <br />
          4번째에 끌렸지만 멈추지 않았고, 5번째에 마음을 빼앗겼지만 또 멈추지 않았죠.
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 56,
            color: theme.accent,
            opacity: punchOp,
          }}
        >
          → 11명을 모두 본 뒤, <strong>5번째</strong>에게 돌아가 결혼했습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};

const TrickStory = ({ frame, fps }: { frame: number; fps: number }) => {
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const numberPop = spring({
    frame: frame - 60,
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 110 },
  });
  const punchOp = interpolate(frame, [120, 160], [0, 1], { extrapolateRight: "clamp" });
  const finalOp = interpolate(frame, [180, 220], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${theme.mintSoft}, ${theme.bg} 70%)`,
        padding: "80px 120px",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 30,
        opacity: fadeIn,
      }}
    >
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 28,
          color: theme.muted,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        Story · Carnegie Mellon
      </div>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 96,
          color: theme.ink,
          textAlign: "center",
          lineHeight: 1.1,
        }}
      >
        Michael Trick의 청혼
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 38,
          color: theme.inkSoft,
          textAlign: "center",
          maxWidth: 1200,
          lineHeight: 1.5,
        }}
      >
        18~40세를 탐색 기간으로 가정. 37% 규칙으로 도출한 결단 시점:
      </div>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 220,
          color: theme.accent,
          fontWeight: 700,
          letterSpacing: -8,
          transform: `scale(${numberPop})`,
        }}
      >
        26.1세
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 36,
          color: theme.muted,
          opacity: punchOp,
          textAlign: "center",
        }}
      >
        정확히 그 나이에 만난 여성에게 청혼...{" "}
        <span style={{ color: theme.accent }}>거절!</span>
      </div>
      <div
        style={{
          marginTop: 20,
          fontFamily: fonts.display,
          fontSize: 44,
          color: theme.mint,
          textAlign: "center",
          opacity: finalOp,
          maxWidth: 1100,
          lineHeight: 1.4,
        }}
      >
        후일 독일의 한 술집에서 만난 여성과 6년 후 결혼. <br />
        <span style={{ color: theme.muted, fontFamily: fonts.body, fontSize: 28 }}>
          ─ 수학이 모든 걸 결정해 주지는 않습니다.
        </span>
      </div>
    </AbsoluteFill>
  );
};
