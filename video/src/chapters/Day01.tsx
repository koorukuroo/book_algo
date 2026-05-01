import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import {
  ImageScene,
  Glow,
  HighlightWalk,
  SpotlightSweep,
  PopStamp,
  Flash,
  Confetti,
  BobArrow,
  FloatingHearts,
} from "../scenes/day01/ImageScene";
import { Subtitles } from "../Subtitles";
import { computeScenes, type Narration } from "../narration";
import { day01, day01Fonts } from "../scenes/day01/style";
import narration from "../../scripts/narrations/day01.json";
import subs from "../subtitles-day01.json";

const SCENES = computeScenes("day01", narration as Narration);

type SceneCfg = {
  src: string;
  zoomFrom: number;
  zoomTo: number;
  panFrom?: { x: number; y: number };
  panTo?: { x: number; y: number };
  shakeAt?: { startFrame: number; durationFrames: number; intensity?: number };
  decoration?: (dur: number) => React.ReactNode;
};

// Each scene has its own personality with distinct effects.
const SCENE_CFG: Record<string, SceneCfg> = {
  title: {
    src: "images/day01/title.jpg",
    zoomFrom: 1.0,
    zoomTo: 1.08,
    decoration: (dur) => (
      <>
        <SpotlightSweep durationInFrames={Math.floor(dur * 0.8)} startFrame={20} color="rgba(212,167,44,0.4)" />
        <Glow x={50} y={45} size={520} color="#d4a72c" delay={40} intensity={0.35} />
      </>
    ),
  },
  hook_request: {
    src: "images/day01/hook_request.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.12,
    panFrom: { x: 35, y: 50 },
    panTo: { x: 60, y: 50 },
    decoration: (dur) => {
      void dur;
      return (
        <>
          <BobArrow x={28} y={20} appearAt={40} emoji="💬" />
          <PopStamp text="2주!" x={78} y={75} appearAt={350} rotate={-8} color="#1a3a6b" size={56} />
        </>
      );
    },
  },
  hook_disaster: {
    src: "images/day01/hook_disaster.jpg",
    zoomFrom: 1.14,
    zoomTo: 1.0,
    panFrom: { x: 50, y: 50 },
    panTo: { x: 50, y: 55 },
    shakeAt: { startFrame: 60, durationFrames: 30, intensity: 12 },
    decoration: () => (
      <>
        <Flash startFrame={60} durationFrames={14} color="#d65a4f" intensity={0.3} />
        <PopStamp text="실패!" x={75} y={20} appearAt={75} rotate={-12} color="#d65a4f" size={72} />
      </>
    ),
  },
  ge_case: {
    src: "images/day01/ge_case.jpg",
    zoomFrom: 1.02,
    zoomTo: 1.1,
    panFrom: { x: 35, y: 50 },
    panTo: { x: 65, y: 50 },
    decoration: () => (
      <>
        <Glow x={50} y={50} size={400} color="#d65a4f" delay={150} intensity={0.4} />
        <BobArrow x={75} y={25} appearAt={500} emoji="📉" />
      </>
    ),
  },
  einstein: {
    src: "images/day01/einstein.jpg",
    zoomFrom: 1.0,
    zoomTo: 1.1,
    panFrom: { x: 50, y: 50 },
    panTo: { x: 55, y: 45 },
    decoration: (dur) => {
      void dur;
      return (
        <>
          <Glow x={62} y={48} size={380} color="#d4a72c" delay={120} intensity={0.5} />
          <BobArrow x={62} y={20} appearAt={300} emoji="💡" />
        </>
      );
    },
  },
  real_problem: {
    src: "images/day01/real_problem.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.1,
    panFrom: { x: 25, y: 50 },
    panTo: { x: 70, y: 50 },
    decoration: () => (
      <>
        <HighlightWalk
          stops={[
            { x: 50, y: 30 },
            { x: 50, y: 50 },
            { x: 50, y: 70 },
          ]}
          startFrame={60}
          stepFrames={120}
          size={280}
          color="rgba(212,167,44,0.45)"
        />
      </>
    ),
  },
  doctor: {
    src: "images/day01/doctor.jpg",
    zoomFrom: 1.02,
    zoomTo: 1.08,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 70, y: 55 },
    decoration: (dur) => {
      void dur;
      return (
        <>
          <SpotlightSweep durationInFrames={300} startFrame={80} color="rgba(42,138,138,0.35)" />
          <Glow x={75} y={75} size={300} color="#d4a72c" delay={500} intensity={0.55} />
        </>
      );
    },
  },
  quantify: {
    src: "images/day01/quantify.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.12,
    panFrom: { x: 50, y: 25 },
    panTo: { x: 50, y: 80 },
    decoration: () => (
      <>
        <HighlightWalk
          stops={[
            { x: 50, y: 28 },
            { x: 50, y: 42 },
            { x: 50, y: 56 },
            { x: 50, y: 70 },
            { x: 50, y: 84 },
          ]}
          startFrame={80}
          stepFrames={100}
          size={360}
          color="rgba(95,195,164,0.45)"
        />
      </>
    ),
  },
  stakeholder: {
    src: "images/day01/stakeholder.jpg",
    zoomFrom: 1.08,
    zoomTo: 1.0,
    panFrom: { x: 30, y: 30 },
    panTo: { x: 50, y: 50 },
    shakeAt: { startFrame: 200, durationFrames: 24, intensity: 8 },
    decoration: () => (
      <>
        <Glow x={28} y={28} size={420} color="#d65a4f" delay={120} intensity={0.5} />
        <PopStamp text="⚠️ 위험" x={28} y={12} appearAt={210} rotate={-6} color="#d65a4f" size={48} />
      </>
    ),
  },
  asis_tobe: {
    src: "images/day01/asis_tobe.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.08,
    panFrom: { x: 25, y: 50 },
    panTo: { x: 75, y: 50 },
    decoration: () => (
      <>
        <SpotlightSweep durationInFrames={400} startFrame={60} color="rgba(212,167,44,0.4)" />
        <BobArrow x={50} y={28} appearAt={350} emoji="✨" />
      </>
    ),
  },
  kpi_roi: {
    src: "images/day01/kpi_roi.jpg",
    zoomFrom: 1.02,
    zoomTo: 1.1,
    panFrom: { x: 50, y: 30 },
    panTo: { x: 50, y: 70 },
    decoration: () => (
      <>
        <Glow x={50} y={75} size={460} color="#d4a72c" delay={180} intensity={0.55} />
        <PopStamp text="151%" x={50} y={75} appearAt={500} rotate={-4} color="#1a3a6b" size={68} />
      </>
    ),
  },
  well_architected: {
    src: "images/day01/well_architected.jpg",
    zoomFrom: 1.06,
    zoomTo: 1.0,
    panFrom: { x: 25, y: 60 },
    panTo: { x: 75, y: 60 },
    decoration: () => (
      <>
        <HighlightWalk
          stops={[
            { x: 18, y: 55 },
            { x: 32, y: 55 },
            { x: 46, y: 55 },
            { x: 58, y: 55 },
            { x: 72, y: 55 },
            { x: 84, y: 55 },
          ]}
          startFrame={80}
          stepFrames={70}
          size={260}
          color="rgba(212,167,44,0.5)"
        />
      </>
    ),
  },
  competencies: {
    src: "images/day01/competencies.jpg",
    zoomFrom: 1.0,
    zoomTo: 1.08,
    panFrom: { x: 50, y: 50 },
    panTo: { x: 50, y: 50 },
    decoration: () => (
      <>
        <Glow x={50} y={55} size={460} color="#2a8a8a" delay={60} intensity={0.4} />
        <SpotlightSweep durationInFrames={400} startFrame={120} color="rgba(212,167,44,0.35)" />
      </>
    ),
  },
  five_lessons: {
    src: "images/day01/five_lessons.jpg",
    zoomFrom: 1.0,
    zoomTo: 1.08,
    panFrom: { x: 50, y: 25 },
    panTo: { x: 50, y: 80 },
    decoration: () => (
      <>
        <HighlightWalk
          stops={[
            { x: 50, y: 28 },
            { x: 50, y: 42 },
            { x: 50, y: 56 },
            { x: 50, y: 70 },
            { x: 50, y: 84 },
          ]}
          startFrame={60}
          stepFrames={150}
          size={400}
          color="rgba(95,195,164,0.5)"
        />
      </>
    ),
  },
  outro: {
    src: "images/day01/outro.jpg",
    zoomFrom: 1.0,
    zoomTo: 1.1,
    decoration: (dur) => (
      <>
        <FloatingHearts count={10} durationInFrames={dur} />
        <Confetti count={20} />
      </>
    ),
  },
};

export const Day01 = () => (
  <AbsoluteFill
    style={{
      backgroundColor: day01.bg,
      fontFamily: day01Fonts.body,
      color: day01.ink,
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
