import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { theme, fonts } from "../theme";
import { TitleScene } from "../scenes/ch01/TitleScene";
import { HookScene } from "../scenes/ch01/HookScene";
import { AlgorithmScene } from "../scenes/ch01/AlgorithmScene";
import { SimulationScene } from "../scenes/ch01/SimulationScene";
import { StoriesScene } from "../scenes/ch01/StoriesScene";
import { OutroScene } from "../scenes/ch01/OutroScene";
import { Subtitles } from "../Subtitles";
import { computeScenes, type Narration } from "../narration";
import narration from "../../scripts/narrations/ch01.json";
import subs from "../subtitles-ch01.json";

const SCENES = computeScenes("ch01", narration as Narration);

const SCENE_COMPONENTS: Record<string, React.FC> = {
  title: TitleScene,
  hook: HookScene,
  algorithm: AlgorithmScene,
  simulation: SimulationScene,
  stories: StoriesScene,
  outro: OutroScene,
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
      {Object.entries(SCENES).map(([id, s]) => {
        const Comp = SCENE_COMPONENTS[id];
        if (!Comp) return null;
        return (
          <Sequence key={id} from={s.from} durationInFrames={s.duration}>
            <Comp />
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
};
