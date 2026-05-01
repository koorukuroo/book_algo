import { AbsoluteFill, Audio, Img, Sequence, staticFile } from "remotion";
import { theme, fonts } from "../theme";
import { TitleScene } from "../scenes/ch02/TitleScene";
import { HookScene } from "../scenes/ch02/HookScene";
import { BanditScene } from "../scenes/ch02/BanditScene";
import { GittinsScene } from "../scenes/ch02/GittinsScene";
import { IntervalScene } from "../scenes/ch02/IntervalScene";
import { OutroScene } from "../scenes/ch02/OutroScene";
import { Subtitles } from "../Subtitles";
import { computeScenes, type Narration } from "../narration";
import narration from "../../scripts/narrations/ch02.json";
import subs from "../subtitles-ch02.json";

const SCENES = computeScenes("ch02", narration as Narration);

const SCENE_COMPONENTS: Record<string, React.FC> = {
  title: TitleScene,
  hook: HookScene,
  bandit: BanditScene,
  gittins: GittinsScene,
  interval: IntervalScene,
  outro: OutroScene,
};

export const Chapter2 = () => {
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
