import { ReactNode } from "react";
import { ch01 } from "./ch01";
import { ch02 } from "./ch02";
import { ch03 } from "./ch03";
import { ch04 } from "./ch04";
import { ch05 } from "./ch05";
import { ch06 } from "./ch06";
import { ch07 } from "./ch07";
import { ch08 } from "./ch08";
import { ch09 } from "./ch09";
import { ch10 } from "./ch10";
import { ch11 } from "./ch11";
import { conclusion } from "./conclusion";

export const chapterContent: Record<string, () => ReactNode> = {
  "optimal-stopping": ch01,
  "explore-exploit": ch02,
  sorting: ch03,
  caching: ch04,
  scheduling: ch05,
  "bayes-rule": ch06,
  overfitting: ch07,
  relaxation: ch08,
  randomness: ch09,
  networking: ch10,
  "game-theory": ch11,
  "computational-kindness": conclusion,
};
