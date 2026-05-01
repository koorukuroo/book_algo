import { Composition } from "remotion";
import { Chapter1 } from "./chapters/Chapter1";
import { Chapter2 } from "./chapters/Chapter2";
import { Chapter3 } from "./chapters/Chapter3";
import { Chapter4 } from "./chapters/Chapter4";
import { Chapter5 } from "./chapters/Chapter5";
import { Chapter6 } from "./chapters/Chapter6";
import { Chapter7 } from "./chapters/Chapter7";
import { Chapter8 } from "./chapters/Chapter8";
import { Chapter9 } from "./chapters/Chapter9";
import { Chapter10 } from "./chapters/Chapter10";
import { Chapter11 } from "./chapters/Chapter11";
import { Conclusion } from "./chapters/Conclusion";
import { Solo7 } from "./chapters/Solo7";
import { Day01 } from "./chapters/Day01";
import { Day02 } from "./chapters/Day02";
import { Day03 } from "./chapters/Day03";
import { Day04 } from "./chapters/Day04";
import { computeTotalFrames, type Narration } from "./narration";
import ch01 from "../scripts/narrations/ch01.json";
import ch02 from "../scripts/narrations/ch02.json";
import ch03 from "../scripts/narrations/ch03.json";
import ch04 from "../scripts/narrations/ch04.json";
import ch05 from "../scripts/narrations/ch05.json";
import ch06 from "../scripts/narrations/ch06.json";
import ch07 from "../scripts/narrations/ch07.json";
import ch08 from "../scripts/narrations/ch08.json";
import ch09 from "../scripts/narrations/ch09.json";
import ch10 from "../scripts/narrations/ch10.json";
import ch11 from "../scripts/narrations/ch11.json";
import conclusion from "../scripts/narrations/conclusion.json";
import solo7Narration from "../scripts/narrations/solo7.json";
import day01Narration from "../scripts/narrations/day01.json";
import day02Narration from "../scripts/narrations/day02.json";
import day03Narration from "../scripts/narrations/day03.json";
import day04Narration from "../scripts/narrations/day04.json";
import "./load-fonts";

const compositions = [
  { id: "Chapter1", component: Chapter1, narration: ch01 },
  { id: "Chapter2", component: Chapter2, narration: ch02 },
  { id: "Chapter3", component: Chapter3, narration: ch03 },
  { id: "Chapter4", component: Chapter4, narration: ch04 },
  { id: "Chapter5", component: Chapter5, narration: ch05 },
  { id: "Chapter6", component: Chapter6, narration: ch06 },
  { id: "Chapter7", component: Chapter7, narration: ch07 },
  { id: "Chapter8", component: Chapter8, narration: ch08 },
  { id: "Chapter9", component: Chapter9, narration: ch09 },
  { id: "Chapter10", component: Chapter10, narration: ch10 },
  { id: "Chapter11", component: Chapter11, narration: ch11 },
  { id: "Conclusion", component: Conclusion, narration: conclusion },
  { id: "Solo7", component: Solo7, narration: solo7Narration },
  { id: "Day01", component: Day01, narration: day01Narration },
  { id: "Day02", component: Day02, narration: day02Narration },
  { id: "Day03", component: Day03, narration: day03Narration },
  { id: "Day04", component: Day04, narration: day04Narration },
];

export const Root = () => {
  return (
    <>
      {compositions.map(({ id, component, narration }) => {
        const n = narration as Narration;
        return (
          <Composition
            key={id}
            id={id}
            component={component}
            durationInFrames={computeTotalFrames(n)}
            fps={n.fps}
            width={1920}
            height={1080}
          />
        );
      })}
    </>
  );
};
