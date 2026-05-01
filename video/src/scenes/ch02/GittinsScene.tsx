import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../../theme";

// Selected Gittins indices for the 90% discount table — chapter highlights:
// untried (0,0) is *higher* than 9-of-10 known wins.
const TABLE = [
  { record: "0–0", index: 0.7029, highlight: true, note: "미지" },
  { record: "1–1", index: 0.6346, highlight: false, note: "" },
  { record: "2–2", index: 0.6010, highlight: false, note: "" },
  { record: "5–5", index: 0.5564, highlight: false, note: "" },
  { record: "7–10", index: 0.6300, highlight: false, note: "70% 성공" },
  { record: "9–10", index: 0.6736, highlight: false, note: "90% 성공" },
];

export const GittinsScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const subOp = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });

  const rowsAppearStart = 150;
  const rowDelta = 50;

  // Big number reveal for 0.7029 (timed to "0.7029" narration ~17–20s)
  const bigOp = interpolate(frame, [600, 660], [0, 1], { extrapolateRight: "clamp" });
  const bigScale = spring({ frame: frame - 600, fps, from: 0.4, to: 1, config: { damping: 10 } });

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
          fontSize: 64,
          color: theme.ink,
          opacity: titleOp,
        }}
      >
        🇬🇧 John Gittins · 1970s
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontSize: 30,
          color: theme.muted,
          opacity: subOp,
          marginBottom: 10,
        }}
      >
        각 머신의 "독립 가치" — Gittins Index
      </div>

      <div style={{ display: "flex", gap: 60, alignItems: "center", marginTop: 10 }}>
        {/* Table */}
        <div
          style={{
            background: "white",
            borderRadius: 24,
            padding: "30px 40px",
            border: `4px solid ${theme.line}`,
            boxShadow: `8px 8px 0 ${theme.ink}`,
            minWidth: 460,
          }}
        >
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 22,
              color: theme.muted,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 16,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>전적</span>
            <span>지수</span>
          </div>
          {TABLE.map((row, i) => {
            const op = interpolate(
              frame,
              [rowsAppearStart + i * rowDelta, rowsAppearStart + i * rowDelta + 40],
              [0, 1],
              { extrapolateRight: "clamp" },
            );
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "10px 0",
                  borderBottom: i === TABLE.length - 1 ? "none" : `2px dashed ${theme.line}`,
                  opacity: op,
                  background: row.highlight ? theme.accentSoft : "transparent",
                  borderRadius: row.highlight ? 12 : 0,
                  paddingLeft: row.highlight ? 16 : 0,
                  paddingRight: row.highlight ? 16 : 0,
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: fonts.display,
                      fontSize: 36,
                      color: row.highlight ? theme.accent : theme.ink,
                      fontWeight: 700,
                    }}
                  >
                    {row.record}
                  </span>
                  {row.note && (
                    <span
                      style={{
                        fontFamily: fonts.body,
                        fontSize: 18,
                        color: theme.muted,
                        marginLeft: 12,
                      }}
                    >
                      {row.note}
                    </span>
                  )}
                </div>
                <span
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 36,
                    fontWeight: 700,
                    color: row.highlight ? theme.accent : theme.ink,
                  }}
                >
                  {row.index.toFixed(4)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Big number on right */}
        <div
          style={{
            opacity: bigOp,
            transform: `scale(${bigScale})`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 24,
              color: theme.muted,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            한 번도 안 당겨본 머신
          </div>
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: 220,
              fontWeight: 700,
              color: theme.accent,
              lineHeight: 1,
              letterSpacing: -8,
            }}
          >
            0.7029
          </div>
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 28,
              color: theme.inkSoft,
              maxWidth: 380,
              lineHeight: 1.5,
              marginTop: 16,
            }}
          >
            🌱 미지의 가치 ＞ 70% 검증된 머신
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
