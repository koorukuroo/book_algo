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
} from "../scenes/day03/ImageScene";
import {
  PacketTrail,
  PulseNode,
  CountUp,
  ScanLine,
  GridOverlay,
  BarrierBlock,
  DrawLine,
} from "../scenes/day03/NetworkFx";
import { Subtitles } from "../Subtitles";
import { computeScenes, type Narration } from "../narration";
import { day03, day03Fonts } from "../scenes/day03/style";
import narration from "../../scripts/narrations/day03.json";
import subs from "../subtitles-day03.json";

const SCENES = computeScenes("day03", narration as Narration);

type SceneCfg = {
  src: string;
  zoomFrom: number;
  zoomTo: number;
  panFrom?: { x: number; y: number };
  panTo?: { x: number; y: number };
  shakeAt?: { startFrame: number; durationFrames: number; intensity?: number };
  decoration?: (dur: number) => React.ReactNode;
};

const SCENE_CFG: Record<string, SceneCfg> = {
  title: {
    src: "images/day03/title.jpg",
    zoomFrom: 1.0,
    zoomTo: 1.06,
    decoration: (dur) => (
      <>
        <GridOverlay opacity={0.4} gridSize={60} color="rgba(13,39,82,0.05)" />
        <SpotlightSweep
          durationInFrames={Math.floor(dur * 0.7)}
          startFrame={20}
          color="rgba(10,166,201,0.4)"
        />
        <PacketTrail
          path="M50,30 L20,60 M50,30 L50,60 M50,30 L80,60"
          color="#fbb437"
          startFrame={40}
          durationPerLap={70}
          packetCount={4}
          packetSize={22}
          showRoute={false}
        />
        <Glow x={50} y={45} size={520} color="#0aa6c9" delay={60} intensity={0.32} />
      </>
    ),
  },
  blackfriday: {
    src: "images/day03/blackfriday.jpg",
    zoomFrom: 1.12,
    zoomTo: 1.0,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 50, y: 50 },
    shakeAt: { startFrame: 50, durationFrames: 30, intensity: 12 },
    decoration: () => (
      <>
        <Flash startFrame={50} durationFrames={14} color="#d65a4f" intensity={0.3} />
        <PopStamp text="DOWN!" x={28} y={20} appearAt={70} rotate={-12} color="#d65a4f" size={66} />
        <CountUp x={75} y={75} from={0} to={12} startFrame={400} durationFrames={70} suffix="억 손실" color="#d65a4f" fontSize={56} />
      </>
    ),
  },
  alb_concept: {
    src: "images/day03/alb_concept.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.1,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 70, y: 50 },
    decoration: () => (
      <>
        <PacketTrail
          path="M5,40 Q25,40 40,55 M5,40 Q25,40 60,55 M5,40 Q25,40 80,55"
          color="#fbb437"
          startFrame={40}
          durationPerLap={80}
          packetCount={3}
          packetSize={20}
          showRoute={false}
        />
        <BobArrow x={20} y={20} appearAt={120} emoji="🛒" />
      </>
    ),
  },
  nlb_vs_alb: {
    src: "images/day03/nlb_vs_alb.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.0,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 70, y: 50 },
    decoration: () => (
      <>
        <Glow x={30} y={55} size={340} color="#0aa6c9" delay={60} intensity={0.4} />
        <Glow x={70} y={55} size={380} color="#0d2752" delay={300} intensity={0.45} />
        <PopStamp text="99%" x={50} y={88} appearAt={500} color="#3aa676" size={44} rotate={-3} />
      </>
    ),
  },
  alb_parts: {
    src: "images/day03/alb_parts.jpg",
    zoomFrom: 1.0,
    zoomTo: 1.06,
    decoration: () => (
      <>
        <PulseNode x={30} y={32} size={50} color="#0aa6c9" startFrame={60} rings={2} />
        <PulseNode x={70} y={32} size={50} color="#0d2752" startFrame={180} rings={2} />
        <PulseNode x={30} y={72} size={50} color="#e5a01a" startFrame={300} rings={2} />
        <PulseNode x={70} y={72} size={50} color="#3aa676" startFrame={420} rings={2} />
      </>
    ),
  },
  health_check: {
    src: "images/day03/health_check.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.0,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 70, y: 50 },
    decoration: () => (
      <>
        <PacketTrail
          path="M22,32 L78,32 M22,50 L78,50 M22,68 L78,68"
          color="#fbb437"
          startFrame={50}
          durationPerLap={50}
          packetCount={3}
          packetSize={18}
          showRoute={false}
        />
        <BarrierBlock x={75} y={68} appearAt={350} size={70} color="#d65a4f" />
        <Flash startFrame={350} durationFrames={10} color="#d65a4f" intensity={0.25} />
      </>
    ),
  },
  asg_concept: {
    src: "images/day03/asg_concept.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.1,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 70, y: 50 },
    decoration: (dur) => {
      void dur;
      return (
        <>
          <PacketTrail
            path="M30,45 L80,45"
            color="#3aa676"
            startFrame={60}
            durationPerLap={45}
            packetCount={5}
            packetSize={18}
            showRoute={false}
          />
          <BobArrow x={50} y={20} appearAt={300} emoji="🚖" />
          <Glow x={70} y={50} size={400} color="#3aa676" delay={400} intensity={0.4} />
        </>
      );
    },
  },
  launch_template: {
    src: "images/day03/launch_template.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.0,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 70, y: 50 },
    decoration: () => (
      <>
        <DrawLine
          from={{ x: 35, y: 55 }}
          to={{ x: 70, y: 55 }}
          startFrame={120}
          durationFrames={50}
          color="#e5a01a"
          width={5}
          dashed
        />
        <BobArrow x={50} y={28} appearAt={240} emoji="📋" />
      </>
    ),
  },
  min_max_desired: {
    src: "images/day03/min_max_desired.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.0,
    panFrom: { x: 25, y: 50 },
    panTo: { x: 75, y: 50 },
    decoration: () => (
      <>
        <HighlightWalk
          stops={[
            { x: 20, y: 50 },
            { x: 50, y: 50 },
            { x: 80, y: 50 },
          ]}
          startFrame={80}
          stepFrames={170}
          size={300}
          color="rgba(229,160,26,0.4)"
        />
        <CountUp x={50} y={32} from={2} to={4} startFrame={300} durationFrames={60} suffix="대" color="#e5a01a" fontSize={62} />
      </>
    ),
  },
  target_tracking: {
    src: "images/day03/target_tracking.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.1,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 70, y: 50 },
    decoration: () => (
      <>
        <Glow x={28} y={50} size={300} color="#0aa6c9" delay={50} intensity={0.45} />
        <PacketTrail
          path="M30,50 Q50,45 80,50"
          color="#fbb437"
          startFrame={150}
          durationPerLap={40}
          packetCount={3}
          packetSize={20}
          showRoute={false}
        />
        <PopStamp text="50%" x={28} y={32} appearAt={250} color="#0aa6c9" size={50} rotate={-4} />
      </>
    ),
  },
  step_scheduled: {
    src: "images/day03/step_scheduled.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.0,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 70, y: 50 },
    decoration: () => (
      <>
        <Glow x={30} y={50} size={300} color="#0aa6c9" delay={80} intensity={0.4} />
        <Glow x={70} y={50} size={300} color="#e5a01a" delay={350} intensity={0.45} />
        <BobArrow x={70} y={20} appearAt={500} emoji="⏰" />
      </>
    ),
  },
  multi_az_ha: {
    src: "images/day03/multi_az_ha.jpg",
    zoomFrom: 1.06,
    zoomTo: 1.0,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 70, y: 50 },
    decoration: () => (
      <>
        <PacketTrail
          path="M50,28 L25,55 M50,28 L75,55"
          color="#fbb437"
          startFrame={60}
          durationPerLap={70}
          packetCount={4}
          packetSize={18}
          showRoute={false}
        />
        <BarrierBlock x={25} y={68} appearAt={350} size={70} color="#d65a4f" />
        <Flash startFrame={350} durationFrames={12} color="#d65a4f" intensity={0.2} />
        <PulseNode x={75} y={68} size={70} color="#3aa676" startFrame={400} rings={2} />
        <CountUp x={75} y={88} from={0} to={9999} startFrame={550} durationFrames={80} prefix="99." suffix="%" color="#3aa676" fontSize={48} />
      </>
    ),
  },
  alb_sg_security: {
    src: "images/day03/alb_sg_security.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.0,
    panFrom: { x: 50, y: 30 },
    panTo: { x: 50, y: 70 },
    decoration: () => (
      <>
        <BarrierBlock x={85} y={28} appearAt={80} size={60} color="#d65a4f" />
        <PulseNode x={85} y={72} size={60} color="#3aa676" startFrame={300} rings={2} />
        <Glow x={50} y={70} size={400} color="#3aa676" delay={350} intensity={0.35} />
      </>
    ),
  },
  trouble: {
    src: "images/day03/trouble.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.0,
    panFrom: { x: 50, y: 25 },
    panTo: { x: 50, y: 80 },
    decoration: () => (
      <>
        <HighlightWalk
          stops={[
            { x: 50, y: 28 },
            { x: 50, y: 50 },
            { x: 50, y: 72 },
          ]}
          startFrame={60}
          stepFrames={250}
          size={500}
          color="rgba(214,90,79,0.35)"
        />
        <BarrierBlock x={88} y={28} appearAt={70} size={56} color="#d65a4f" />
        <BarrierBlock x={88} y={50} appearAt={320} size={56} color="#e5a01a" />
        <BarrierBlock x={88} y={72} appearAt={570} size={56} color="#fbb437" />
      </>
    ),
  },
  five_lessons: {
    src: "images/day03/five_lessons.jpg",
    zoomFrom: 1.0,
    zoomTo: 1.06,
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
          stepFrames={210}
          size={420}
          color="rgba(10,166,201,0.45)"
        />
        <SpotlightSweep durationInFrames={500} startFrame={80} color="rgba(229,160,26,0.3)" />
      </>
    ),
  },
  outro: {
    src: "images/day03/outro.jpg",
    zoomFrom: 1.0,
    zoomTo: 1.1,
    decoration: (dur) => (
      <>
        <FloatingHearts count={8} durationInFrames={dur} />
        <Confetti count={20} />
        <PacketTrail
          path="M15,80 Q40,60 65,55 Q80,50 90,45"
          color="#0aa6c9"
          startFrame={20}
          durationPerLap={80}
          packetCount={3}
          packetSize={20}
          showRoute
        />
      </>
    ),
  },
};

export const Day03 = () => (
  <AbsoluteFill
    style={{
      backgroundColor: day03.bg,
      fontFamily: day03Fonts.body,
      color: day03.ink,
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
