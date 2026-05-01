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
} from "../scenes/day04/ImageScene";
import {
  PacketTrail,
  PulseNode,
  CountUp,
  ScanLine,
  GridOverlay,
  BarrierBlock,
  DrawLine,
} from "../scenes/day04/NetworkFx";
import { Subtitles } from "../Subtitles";
import { computeScenes, type Narration } from "../narration";
import { day04, day04Fonts } from "../scenes/day04/style";
import narration from "../../scripts/narrations/day04.json";
import subs from "../subtitles-day04.json";

const SCENES = computeScenes("day04", narration as Narration);

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
    src: "images/day04/title.jpg",
    zoomFrom: 1.0,
    zoomTo: 1.06,
    decoration: (dur) => (
      <>
        <GridOverlay opacity={0.4} gridSize={60} color="rgba(13,39,82,0.05)" />
        <SpotlightSweep
          durationInFrames={Math.floor(dur * 0.7)}
          startFrame={20}
          color="rgba(229,160,26,0.4)"
        />
        <PulseNode x={50} y={55} size={120} color="#0aa6c9" startFrame={40} rings={3} />
        <Glow x={50} y={55} size={420} color="#0aa6c9" delay={60} intensity={0.3} />
      </>
    ),
  },
  hook: {
    src: "images/day04/hook.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.0,
    panFrom: { x: 25, y: 50 },
    panTo: { x: 75, y: 50 },
    decoration: () => (
      <>
        <PopStamp text="6주!" x={28} y={20} appearAt={50} rotate={-10} color="#d65a4f" size={60} />
        <PopStamp text="1분!" x={75} y={20} appearAt={400} rotate={6} color="#3aa676" size={70} />
        <Glow x={75} y={50} size={420} color="#3aa676" delay={420} intensity={0.4} />
        <Confetti count={14} />
      </>
    ),
  },
  ec2_rental: {
    src: "images/day04/ec2_rental.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.1,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 70, y: 50 },
    decoration: () => (
      <>
        <SpotlightSweep durationInFrames={300} startFrame={60} color="rgba(10,166,201,0.35)" />
        <BobArrow x={50} y={20} appearAt={150} emoji="💻" />
      </>
    ),
  },
  ami: {
    src: "images/day04/ami.jpg",
    zoomFrom: 1.0,
    zoomTo: 1.08,
    panFrom: { x: 25, y: 50 },
    panTo: { x: 70, y: 50 },
    decoration: () => (
      <>
        <DrawLine
          from={{ x: 25, y: 50 }}
          to={{ x: 75, y: 50 }}
          startFrame={80}
          durationFrames={40}
          color="#e5a01a"
          width={5}
          dashed
        />
        <PulseNode x={75} y={50} size={60} color="#3aa676" startFrame={140} rings={2} />
      </>
    ),
  },
  instance_type: {
    src: "images/day04/instance_type.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.0,
    panFrom: { x: 50, y: 30 },
    panTo: { x: 50, y: 75 },
    decoration: () => (
      <>
        <HighlightWalk
          stops={[
            { x: 30, y: 40 },
            { x: 50, y: 40 },
            { x: 70, y: 40 },
          ]}
          startFrame={80}
          stepFrames={120}
          size={260}
          color="rgba(229,160,26,0.45)"
        />
        <BobArrow x={50} y={20} appearAt={300} emoji="📐" />
      </>
    ),
  },
  ebs_vs_store: {
    src: "images/day04/ebs_vs_store.jpg",
    zoomFrom: 1.06,
    zoomTo: 1.0,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 70, y: 50 },
    shakeAt: { startFrame: 400, durationFrames: 24, intensity: 8 },
    decoration: () => (
      <>
        <PulseNode x={28} y={50} size={60} color="#3aa676" startFrame={60} rings={2} />
        <BarrierBlock x={75} y={50} appearAt={400} size={80} color="#d65a4f" />
        <Flash startFrame={400} durationFrames={12} color="#d65a4f" intensity={0.25} />
      </>
    ),
  },
  ebs_volumes: {
    src: "images/day04/ebs_volumes.jpg",
    zoomFrom: 1.0,
    zoomTo: 1.06,
    decoration: () => (
      <>
        <PulseNode x={28} y={32} size={50} color="#0aa6c9" startFrame={50} rings={2} />
        <PulseNode x={72} y={32} size={50} color="#e5a01a" startFrame={170} rings={2} />
        <PulseNode x={28} y={72} size={50} color="#3aa676" startFrame={290} rings={2} />
        <PulseNode x={72} y={72} size={50} color="#6b7a96" startFrame={410} rings={2} />
        <PopStamp text="gp3!" x={50} y={88} appearAt={550} color="#0aa6c9" size={48} rotate={-3} />
      </>
    ),
  },
  snapshot: {
    src: "images/day04/snapshot.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.0,
    panFrom: { x: 25, y: 50 },
    panTo: { x: 70, y: 50 },
    decoration: () => (
      <>
        <PacketTrail
          path="M25,50 Q50,40 75,50"
          color="#fbb437"
          startFrame={60}
          durationPerLap={60}
          packetCount={3}
          packetSize={20}
          showRoute
        />
        <BobArrow x={75} y={28} appearAt={300} emoji="💾" />
      </>
    ),
  },
  pricing: {
    src: "images/day04/pricing.jpg",
    zoomFrom: 1.06,
    zoomTo: 1.0,
    panFrom: { x: 25, y: 50 },
    panTo: { x: 75, y: 50 },
    decoration: () => (
      <>
        <CountUp x={25} y={20} from={100} to={28} startFrame={300} durationFrames={80} prefix="-" suffix="%" color="#3aa676" fontSize={48} />
        <CountUp x={75} y={20} from={0} to={90} startFrame={500} durationFrames={80} prefix="-" suffix="%" color="#e5a01a" fontSize={56} />
        <Glow x={50} y={88} size={400} color="#0aa6c9" delay={700} intensity={0.35} />
      </>
    ),
  },
  keypair_ssh: {
    src: "images/day04/keypair_ssh.jpg",
    zoomFrom: 1.06,
    zoomTo: 1.0,
    panFrom: { x: 50, y: 30 },
    panTo: { x: 50, y: 60 },
    decoration: () => (
      <>
        <Glow x={50} y={35} size={300} color="#e5a01a" delay={50} intensity={0.55} />
        <BarrierBlock x={88} y={28} appearAt={250} size={56} color="#d65a4f" />
        <BarrierBlock x={88} y={50} appearAt={400} size={56} color="#e5a01a" />
        <BarrierBlock x={88} y={72} appearAt={550} size={56} color="#fbb437" />
      </>
    ),
  },
  user_data: {
    src: "images/day04/user_data.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.0,
    panFrom: { x: 25, y: 50 },
    panTo: { x: 75, y: 50 },
    decoration: () => (
      <>
        <PacketTrail
          path="M25,40 L75,40"
          color="#fbb437"
          startFrame={50}
          durationPerLap={45}
          packetCount={3}
          packetSize={18}
          showRoute={false}
        />
        <BobArrow x={50} y={20} appearAt={250} emoji="📜" />
        <Confetti count={10} />
      </>
    ),
  },
  sg_reference: {
    src: "images/day04/sg_reference.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.0,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 70, y: 50 },
    decoration: () => (
      <>
        <BarrierBlock x={28} y={28} appearAt={80} size={60} color="#d65a4f" />
        <PulseNode x={75} y={50} size={60} color="#3aa676" startFrame={300} rings={2} />
        <Glow x={75} y={50} size={360} color="#3aa676" delay={350} intensity={0.4} />
      </>
    ),
  },
  netflix: {
    src: "images/day04/netflix.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.1,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 70, y: 50 },
    decoration: () => (
      <>
        <PacketTrail
          path="M25,50 Q40,30 60,50 Q75,70 90,50"
          color="#fbb437"
          startFrame={60}
          durationPerLap={70}
          packetCount={4}
          packetSize={20}
          showRoute={false}
        />
        <CountUp x={75} y={88} from={0} to={9999} startFrame={550} durationFrames={80} prefix="99." suffix="%" color="#3aa676" fontSize={48} />
      </>
    ),
  },
  trouble: {
    src: "images/day04/trouble.jpg",
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
          stepFrames={300}
          size={500}
          color="rgba(214,90,79,0.35)"
        />
        <BarrierBlock x={88} y={28} appearAt={70} size={56} color="#d65a4f" />
        <BarrierBlock x={88} y={50} appearAt={370} size={56} color="#e5a01a" />
        <BarrierBlock x={88} y={72} appearAt={670} size={56} color="#fbb437" />
      </>
    ),
  },
  five_lessons: {
    src: "images/day04/five_lessons.jpg",
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
          stepFrames={230}
          size={420}
          color="rgba(10,166,201,0.45)"
        />
        <SpotlightSweep durationInFrames={500} startFrame={80} color="rgba(229,160,26,0.3)" />
      </>
    ),
  },
  outro: {
    src: "images/day04/outro.jpg",
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

export const Day04 = () => (
  <AbsoluteFill
    style={{
      backgroundColor: day04.bg,
      fontFamily: day04Fonts.body,
      color: day04.ink,
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
