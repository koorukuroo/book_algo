import Image from "next/image";

type Orientation = "square" | "vertical" | "horizontal";

const PRESET: Record<
  Orientation,
  { wrap: string; aspect: string; sizes: string; defaultPanel: string }
> = {
  square: {
    wrap: "relative max-w-[680px] mx-auto",
    aspect: "aspect-square",
    sizes: "(max-width: 768px) 100vw, 680px",
    defaultPanel: "4컷 만화",
  },
  vertical: {
    wrap: "relative max-w-[360px] mx-auto",
    aspect: "aspect-[9/16]",
    sizes: "(max-width: 768px) 90vw, 360px",
    defaultPanel: "세로 웹툰",
  },
  horizontal: {
    wrap: "relative max-w-[820px] mx-auto",
    aspect: "aspect-video",
    sizes: "(max-width: 768px) 100vw, 820px",
    defaultPanel: "작동 원리",
  },
};

export function Webtoon({
  src,
  caption,
  panel,
  orientation = "square",
}: {
  src: string;
  caption?: string;
  panel?: string;
  orientation?: Orientation;
}) {
  const p = PRESET[orientation];
  return (
    <figure className="my-10">
      <div className={p.wrap}>
        <div className="absolute -top-3 -left-3 z-10 px-3 py-1 rounded-full bg-[var(--color-ink)] text-white text-xs font-display rotate-[-3deg] shadow-md">
          {panel ?? p.defaultPanel}
        </div>
        <div className={`relative ${p.aspect} rounded-3xl overflow-hidden border-2 border-[var(--color-ink)] shadow-[6px_6px_0_var(--color-ink)] bg-white`}>
          <Image
            src={src}
            alt={caption ?? "웹툰"}
            fill
            sizes={p.sizes}
            className="object-cover"
            loading="eager"
          />
        </div>
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-[var(--color-muted)] mt-4 italic max-w-xl mx-auto leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
