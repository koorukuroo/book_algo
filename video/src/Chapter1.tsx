import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { theme, fonts } from "./theme";
import { TitleScene } from "./scenes/TitleScene";
import { HookScene } from "./scenes/HookScene";
import { AlgorithmScene } from "./scenes/AlgorithmScene";
import { SimulationScene } from "./scenes/SimulationScene";
import { StoriesScene } from "./scenes/StoriesScene";
import { OutroScene } from "./scenes/OutroScene";

// Frame budget @ 30fps. Each duration is sized to its narration audio
// (rounded up to whole seconds for breathing room).
//   Title       0    →  300   (10s)
//   Hook       300   →  840   (18s)
//   Algorithm  840   → 1740   (30s)
//   Simulation 1740  → 2490   (25s)
//   Stories    2490  → 3870   (46s)
//   Outro      3870  → 4290   (14s)
//   Total = 143s
const SCENES = {
  title: { from: 0, dur: 300, audio: "audio/title.mp3" },
  hook: { from: 300, dur: 540, audio: "audio/hook.mp3" },
  algorithm: { from: 840, dur: 900, audio: "audio/algorithm.mp3" },
  simulation: { from: 1740, dur: 750, audio: "audio/simulation.mp3" },
  stories: { from: 2490, dur: 1380, audio: "audio/stories.mp3" },
  outro: { from: 3870, dur: 420, audio: "audio/outro.mp3" },
};

export const Chapter1 = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        fontFamily: fonts.body,
        color: theme.ink,
      }}
    >
      <Sequence from={SCENES.title.from} durationInFrames={SCENES.title.dur}>
        <TitleScene />
        <Audio src={staticFile(SCENES.title.audio)} />
      </Sequence>
      <Sequence from={SCENES.hook.from} durationInFrames={SCENES.hook.dur}>
        <HookScene />
        <Audio src={staticFile(SCENES.hook.audio)} />
      </Sequence>
      <Sequence from={SCENES.algorithm.from} durationInFrames={SCENES.algorithm.dur}>
        <AlgorithmScene />
        <Audio src={staticFile(SCENES.algorithm.audio)} />
      </Sequence>
      <Sequence from={SCENES.simulation.from} durationInFrames={SCENES.simulation.dur}>
        <SimulationScene />
        <Audio src={staticFile(SCENES.simulation.audio)} />
      </Sequence>
      <Sequence from={SCENES.stories.from} durationInFrames={SCENES.stories.dur}>
        <StoriesScene />
        <Audio src={staticFile(SCENES.stories.audio)} />
      </Sequence>
      <Sequence from={SCENES.outro.from} durationInFrames={SCENES.outro.dur}>
        <OutroScene />
        <Audio src={staticFile(SCENES.outro.audio)} />
      </Sequence>

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
    </AbsoluteFill>
  );
};
