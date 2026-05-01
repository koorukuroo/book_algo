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
} from "../scenes/day02/ImageScene";
import {
  PacketTrail,
  PulseNode,
  BuildUpBox,
  CountUp,
  ScanLine,
  GridOverlay,
  TypewriterLine,
  BarrierBlock,
  DrawLine,
} from "../scenes/day02/NetworkFx";
import { Subtitles } from "../Subtitles";
import { computeScenes, type Narration } from "../narration";
import { day02, day02Fonts } from "../scenes/day02/style";
import narration from "../../scripts/narrations/day02.json";
import subs from "../subtitles-day02.json";

const SCENES = computeScenes("day02", narration as Narration);

type SceneCfg = {
  src: string;
  zoomFrom: number;
  zoomTo: number;
  panFrom?: { x: number; y: number };
  panTo?: { x: number; y: number };
  shakeAt?: { startFrame: number; durationFrames: number; intensity?: number };
  decoration?: (dur: number) => React.ReactNode;
};

// Each scene = its own animation language. Mix of:
//   - Network FX: PacketTrail, PulseNode, BuildUpBox, DrawLine, ScanLine
//   - Generic: Glow, SpotlightSweep, PopStamp, Flash, BobArrow, Confetti
const SCENE_CFG: Record<string, SceneCfg> = {
  title: {
    src: "images/day02/title.jpg",
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
          path="M5,80 Q30,60 50,55 T95,40"
          color="#fbb437"
          startFrame={40}
          durationPerLap={120}
          packetCount={4}
          packetSize={22}
          showRoute
        />
        <Glow x={50} y={50} size={520} color="#0aa6c9" delay={60} intensity={0.32} />
      </>
    ),
  },
  why_vpc: {
    src: "images/day02/why_vpc.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.1,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 70, y: 50 },
    decoration: () => (
      <>
        <BarrierBlock x={28} y={28} appearAt={50} size={90} color="#d65a4f" />
        <PopStamp text="문제!" x={28} y={14} appearAt={70} rotate={-8} color="#d65a4f" size={48} />
        <PopStamp text="해결!" x={75} y={14} appearAt={300} rotate={6} color="#3aa676" size={48} />
        <Glow x={75} y={50} size={380} color="#3aa676" delay={310} intensity={0.4} />
      </>
    ),
  },
  apartment: {
    src: "images/day02/apartment.jpg",
    zoomFrom: 1.08,
    zoomTo: 1.0,
    panFrom: { x: 50, y: 40 },
    panTo: { x: 50, y: 55 },
    decoration: (dur) => {
      void dur;
      return (
        <>
          <BuildUpBox
            x={50}
            y={50}
            width={92}
            height={75}
            appearAt={30}
            label="VPC 단지"
            color="rgba(10,166,201,0.0)"
            borderColor="#0aa6c9"
          />
          <BobArrow x={28} y={30} appearAt={120} emoji="🏢" />
          <BobArrow x={68} y={30} appearAt={180} emoji="🏢" />
          <PopStamp text="정문" x={50} y={88} appearAt={260} color="#e5a01a" size={42} rotate={-4} />
        </>
      );
    },
  },
  cidr: {
    src: "images/day02/cidr.jpg",
    zoomFrom: 1.02,
    zoomTo: 1.08,
    panFrom: { x: 50, y: 35 },
    panTo: { x: 50, y: 70 },
    decoration: () => (
      <>
        <CountUp
          x={75}
          y={53}
          from={0}
          to={65536}
          startFrame={120}
          durationFrames={90}
          suffix="개"
          color="#0d2752"
          fontSize={56}
        />
        <Glow x={50} y={28} size={300} color="#e5a01a" delay={80} intensity={0.45} />
        <ScanLine startFrame={250} durationFrames={300} color="#0aa6c9" />
      </>
    ),
  },
  subnet_split: {
    src: "images/day02/subnet_split.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.0,
    panFrom: { x: 50, y: 50 },
    panTo: { x: 50, y: 50 },
    decoration: () => (
      <>
        <PulseNode x={32} y={46} size={48} color="#0aa6c9" startFrame={80} rings={2} />
        <PulseNode x={68} y={46} size={48} color="#0aa6c9" startFrame={140} rings={2} />
        <PulseNode x={32} y={72} size={48} color="#3aa676" startFrame={200} rings={2} />
        <PulseNode x={68} y={72} size={48} color="#3aa676" startFrame={260} rings={2} />
        <DrawLine
          from={{ x: 32, y: 46 }}
          to={{ x: 68, y: 72 }}
          startFrame={320}
          durationFrames={50}
          color="#e5a01a"
          width={4}
          dashed
        />
      </>
    ),
  },
  public_private: {
    src: "images/day02/public_private.jpg",
    zoomFrom: 1.06,
    zoomTo: 1.0,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 70, y: 50 },
    decoration: () => (
      <>
        <PacketTrail
          path="M5,40 Q15,40 30,50"
          color="#0aa6c9"
          startFrame={40}
          durationPerLap={50}
          packetCount={3}
          packetSize={20}
          showRoute={false}
        />
        <BarrierBlock x={50} y={50} appearAt={180} size={70} color="#0d2752" />
        <Glow x={70} y={55} size={300} color="#0d2752" delay={240} intensity={0.35} />
      </>
    ),
  },
  routing: {
    src: "images/day02/routing.jpg",
    zoomFrom: 1.02,
    zoomTo: 1.1,
    panFrom: { x: 50, y: 50 },
    panTo: { x: 50, y: 45 },
    decoration: () => (
      <>
        <SpotlightSweep durationInFrames={300} startFrame={60} color="rgba(229,160,26,0.4)" />
        <PopStamp text="→ IGW" x={28} y={62} appearAt={200} color="#0aa6c9" size={36} rotate={-6} />
        <PopStamp text="→ NAT" x={72} y={62} appearAt={350} color="#0d2752" size={36} rotate={6} />
      </>
    ),
  },
  igw: {
    src: "images/day02/igw.jpg",
    zoomFrom: 1.06,
    zoomTo: 1.0,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 50, y: 50 },
    decoration: () => (
      <>
        <PulseNode x={50} y={48} size={120} color="#0aa6c9" startFrame={30} rings={3} />
        <PacketTrail
          path="M10,48 L90,48"
          color="#fbb437"
          startFrame={80}
          durationPerLap={70}
          packetCount={4}
          packetSize={22}
          showRoute={false}
        />
        <BobArrow x={50} y={20} appearAt={250} emoji="🚪" />
      </>
    ),
  },
  nat: {
    src: "images/day02/nat.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.1,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 70, y: 50 },
    decoration: () => (
      <>
        <PacketTrail
          path="M22,45 L78,45"
          color="#3aa676"
          startFrame={50}
          durationPerLap={60}
          packetCount={3}
          packetSize={20}
          showRoute={false}
        />
        <BarrierBlock x={50} y={62} appearAt={200} size={80} color="#d65a4f" />
        <Flash startFrame={200} durationFrames={12} color="#d65a4f" intensity={0.25} />
        <CountUp x={70} y={88} from={0} to={45} startFrame={500} durationFrames={60} suffix="¢/시간" color="#d65a4f" fontSize={42} />
      </>
    ),
  },
  vpc_endpoint: {
    src: "images/day02/vpc_endpoint.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.0,
    panFrom: { x: 50, y: 35 },
    panTo: { x: 50, y: 65 },
    decoration: () => (
      <>
        <PacketTrail
          path="M15,30 Q50,30 85,30"
          color="rgba(214,90,79,0.5)"
          startFrame={40}
          durationPerLap={80}
          packetCount={2}
          packetSize={16}
          showRoute={false}
        />
        <PacketTrail
          path="M15,68 Q50,68 85,68"
          color="#fbb437"
          startFrame={40}
          durationPerLap={50}
          packetCount={5}
          packetSize={22}
          showRoute={false}
        />
        <PopStamp text="무료!" x={50} y={88} appearAt={300} color="#3aa676" size={56} rotate={-4} />
        <Glow x={50} y={68} size={400} color="#3aa676" delay={250} intensity={0.35} />
      </>
    ),
  },
  security_group: {
    src: "images/day02/security_group.jpg",
    zoomFrom: 1.0,
    zoomTo: 1.08,
    panFrom: { x: 50, y: 50 },
    panTo: { x: 50, y: 50 },
    decoration: () => (
      <>
        <PulseNode x={32} y={50} size={70} color="#0aa6c9" startFrame={30} rings={2} />
        <BobArrow x={32} y={20} appearAt={120} emoji="🛡️" />
        <PopStamp text="Stateful" x={70} y={28} appearAt={250} color="#0aa6c9" size={42} rotate={4} />
      </>
    ),
  },
  nacl: {
    src: "images/day02/nacl.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.0,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 60, y: 50 },
    shakeAt: { startFrame: 280, durationFrames: 22, intensity: 8 },
    decoration: () => (
      <>
        <Flash startFrame={280} durationFrames={10} color="#d65a4f" intensity={0.3} />
        <PopStamp text="🚫 비상" x={50} y={20} appearAt={285} color="#d65a4f" size={50} rotate={-4} />
        <Glow x={50} y={50} size={420} color="#d65a4f" delay={290} intensity={0.32} />
      </>
    ),
  },
  three_tier: {
    src: "images/day02/three_tier.jpg",
    zoomFrom: 1.06,
    zoomTo: 1.0,
    panFrom: { x: 25, y: 50 },
    panTo: { x: 75, y: 50 },
    decoration: () => (
      <>
        <PacketTrail
          path="M3,50 L23,50 L43,50 L63,50 L83,50"
          color="#fbb437"
          startFrame={60}
          durationPerLap={120}
          packetCount={3}
          packetSize={24}
          showRoute={false}
        />
        <PulseNode x={28} y={50} size={50} color="#0aa6c9" startFrame={120} rings={2} />
        <PulseNode x={50} y={50} size={50} color="#3aa676" startFrame={240} rings={2} />
        <PulseNode x={72} y={50} size={50} color="#e5a01a" startFrame={360} rings={2} />
      </>
    ),
  },
  sg_chain: {
    src: "images/day02/sg_chain.jpg",
    zoomFrom: 1.0,
    zoomTo: 1.08,
    panFrom: { x: 30, y: 50 },
    panTo: { x: 70, y: 50 },
    decoration: () => (
      <>
        <CountUp
          x={26}
          y={20}
          from={0}
          to={100}
          startFrame={80}
          durationFrames={70}
          suffix="대"
          color="#0aa6c9"
          fontSize={56}
        />
        <PacketTrail
          path="M25,55 Q50,55 78,55"
          color="#3aa676"
          startFrame={200}
          durationPerLap={45}
          packetCount={5}
          packetSize={20}
          showRoute={false}
        />
        <PopStamp text="1줄!" x={75} y={20} appearAt={350} color="#3aa676" size={56} rotate={-6} />
        <Confetti count={14} />
      </>
    ),
  },
  trouble: {
    src: "images/day02/trouble.jpg",
    zoomFrom: 1.04,
    zoomTo: 1.0,
    panFrom: { x: 50, y: 30 },
    panTo: { x: 50, y: 75 },
    decoration: () => (
      <>
        <HighlightWalk
          stops={[
            { x: 50, y: 32 },
            { x: 50, y: 50 },
            { x: 50, y: 70 },
          ]}
          startFrame={60}
          stepFrames={180}
          size={500}
          color="rgba(214,90,79,0.35)"
        />
        <BarrierBlock x={88} y={32} appearAt={70} size={60} color="#d65a4f" />
        <BarrierBlock x={88} y={50} appearAt={250} size={60} color="#e5a01a" />
        <BarrierBlock x={88} y={70} appearAt={430} size={60} color="#fbb437" />
      </>
    ),
  },
  five_lessons: {
    src: "images/day02/five_lessons.jpg",
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
          stepFrames={170}
          size={420}
          color="rgba(10,166,201,0.45)"
        />
        <SpotlightSweep durationInFrames={500} startFrame={80} color="rgba(229,160,26,0.3)" />
      </>
    ),
  },
  outro: {
    src: "images/day02/outro.jpg",
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

export const Day02 = () => (
  <AbsoluteFill
    style={{
      backgroundColor: day02.bg,
      fontFamily: day02Fonts.body,
      color: day02.ink,
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
