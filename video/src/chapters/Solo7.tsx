import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import {
  ImageScene,
  FloatingHearts,
  Glow,
  HighlightWalk,
  SpotlightSweep,
  PopStamp,
  Flash,
  Confetti,
  BobArrow,
} from "../scenes/solo7/ImageScene";
import { Subtitles } from "../Subtitles";
import { computeScenes, type Narration } from "../narration";
import { solo7, solo7Fonts } from "../scenes/solo7/style";
import narration from "../../scripts/narrations/solo7.json";
import subs from "../subtitles-solo7.json";

const SCENES = computeScenes("solo7", narration as Narration);

type SceneCfg = {
  src: string;
  zoomFrom: number;
  zoomTo: number;
  panFrom?: { x: number; y: number };
  panTo?: { x: number; y: number };
  shakeAt?: { startFrame: number; durationFrames: number; intensity?: number };
  decoration?: (dur: number) => React.ReactNode;
};

// Each scene gets its own "personality":
//   title    → festive intro (hearts + slow ken-burns + spotlight sweep)
//   setup    → spotlight sweep panning across candidates
//   trap     → punch-in zoom + sudden flash + camera shake
//   algorithm→ walking spotlight crossing cards 1→2→3→4
//   mutual   → soft glow on B + downward arrow callout
//   override → glow on the heart pan + drifting hearts
//   outro    → confetti rain
const SCENE_CFG: Record<string, SceneCfg> = {
  title: {
    src: "images/solo7/title-cover.jpg",
    zoomFrom: 1.0,
    zoomTo: 1.1,
    decoration: (dur) => (
      <>
        <FloatingHearts count={14} durationInFrames={dur} />
        <SpotlightSweep durationInFrames={Math.floor(dur * 0.6)} startFrame={20} />
      </>
    ),
  },
  setup: {
    src: "images/solo7/candidates-row.jpg",
    zoomFrom: 1.06,
    zoomTo: 1.16,
    panFrom: { x: 25, y: 50 },
    panTo: { x: 75, y: 50 },
    decoration: (dur) => (
      <>
        <SpotlightSweep durationInFrames={dur} startFrame={0} />
      </>
    ),
  },
  trap: {
    src: "images/solo7/trap.jpg",
    zoomFrom: 1.18,
    zoomTo: 1.0,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 50, y: 55 },
    shakeAt: { startFrame: 100, durationFrames: 30, intensity: 14 },
    decoration: () => (
      <>
        <Flash startFrame={100} durationFrames={10} color="#ff5d8f" intensity={0.35} />
        <PopStamp text="앗!" x={75} y={28} appearAt={108} rotate={-12} size={84} />
      </>
    ),
  },
  algorithm: {
    src: "images/solo7/algorithm.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.14,
    panFrom: { x: 25, y: 50 },
    panTo: { x: 50, y: 50 },
    decoration: (dur) => {
      void dur;
      // Spotlight scans cards 1→2→3, then settles on card 4.
      // 4 cards roughly at x = 22, 32, 42, 52 in screen space (after pan).
      return (
        <>
          <HighlightWalk
            stops={[
              { x: 22, y: 52 },
              { x: 33, y: 52 },
              { x: 44, y: 52 },
              { x: 51, y: 52 },
            ]}
            startFrame={120}
            stepFrames={50}
            size={320}
            color="rgba(255, 200, 220, 0.55)"
          />
          <BobArrow x={51} y={18} appearAt={420} emoji="👇" />
        </>
      );
    },
  },
  mutual: {
    src: "images/solo7/mutual-axis.jpg",
    zoomFrom: 1.02,
    zoomTo: 1.1,
    panFrom: { x: 50, y: 50 },
    panTo: { x: 60, y: 40 },
    decoration: () => (
      <>
        <Glow x={64} y={42} size={360} color="#f5b400" delay={300} intensity={0.6} />
        <BobArrow x={64} y={18} appearAt={420} emoji="⭐" />
      </>
    ),
  },
  override: {
    src: "images/solo7/override.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.12,
    panFrom: { x: 50, y: 50 },
    panTo: { x: 65, y: 50 },
    decoration: (dur) => (
      <>
        <FloatingHearts count={10} durationInFrames={dur} />
        <Glow x={68} y={52} size={420} color="#ff5d8f" delay={180} intensity={0.45} />
      </>
    ),
  },
  outro: {
    src: "images/solo7/outro-summary.jpg",
    zoomFrom: 1.0,
    zoomTo: 1.08,
    decoration: () => (
      <>
        <Confetti count={32} />
      </>
    ),
  },
};

export const Solo7 = () => (
  <AbsoluteFill
    style={{
      backgroundColor: solo7.bg,
      fontFamily: solo7Fonts.body,
      color: solo7.ink,
    }}
  >
    {Object.entries(SCENES).map(([id, s]) => {
      const cfg = SCENE_CFG[id];
      if (!cfg) return null;
      return (
        <Sequence key={id} from={s.from} durationInFrames={s.duration}>
          <ImageScene
            src={cfg.src}
            durationInFrames={s.duration}
            zoomFrom={cfg.zoomFrom}
            zoomTo={cfg.zoomTo}
            panFrom={cfg.panFrom}
            panTo={cfg.panTo}
            shakeAt={cfg.shakeAt}
            decoration={cfg.decoration?.(s.duration)}
          />
          <Audio src={staticFile(s.audio)} />
        </Sequence>
      );
    })}

    <Img
      src={staticFile("images/coredot-logo.png")}
      style={{
        position: "absolute",
        top: 40,
        right: 48,
        width: 140,
        height: "auto",
        opacity: 0.85,
      }}
    />

    <Subtitles cues={subs.cues} />
  </AbsoluteFill>
);
