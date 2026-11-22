import type { Image } from "./types.ts";

// The shapes a picture comes in, as width:height.
export type PictureRatio = "1:1" | "3:2" | "4:3" | "16:9" | "16:10";

type PictureProps = {
  // Left out while there is no picture yet: its place is tinted.
  image?: Image | undefined;
  ratio: PictureRatio;
};

export function Picture({ image, ratio }: PictureProps) {
  const className = `py-picture py-picture-${ratio.replace(":", "-")}`;
  // A place with no picture says nothing to a reader who cannot see it.
  if (image === undefined) return <span className={className} aria-hidden="true" />;
  return (
    <img className={className} src={image.src} alt={image.alt} loading="lazy" decoding="async" />
  );
}
