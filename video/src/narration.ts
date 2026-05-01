export type NarrationScene = {
  id: string;
  from: number;
  duration: number;
  text: string;
};

export type Narration = {
  voice_id: string;
  model_id: string;
  fps: number;
  scenes: NarrationScene[];
};

export const computeScenes = (chapterId: string, n: Narration) =>
  Object.fromEntries(
    n.scenes.map((s) => [
      s.id,
      { ...s, audio: `audio/${chapterId}/${s.id}.mp3` },
    ]),
  );

export const computeTotalFrames = (n: Narration): number =>
  n.scenes.reduce((max, s) => Math.max(max, s.from + s.duration), 0);
