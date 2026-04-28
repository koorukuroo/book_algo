import { Composition } from "remotion";
import { Chapter1 } from "./Chapter1";
import "./load-fonts";

export const Root = () => {
  return (
    <>
      <Composition
        id="Chapter1"
        component={Chapter1}
        durationInFrames={4290}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
