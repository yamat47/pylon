import type { ReactNode } from "react";
import { LinkList } from "./LinkList.tsx";
import { Picture } from "./Picture.tsx";
import { Prose } from "./Prose.tsx";
import { Text } from "./Text.tsx";
import type { Image, LinkItem } from "./types.ts";

type AboutSectionProps = {
  // What the section tells of: work, open source, American football, games. An h2.
  title: string;
  // The text, as paragraphs.
  children: ReactNode;
  // Photographs, 4:3, side by side under the text.
  photos?: readonly Image[] | undefined;
  // Where to read more: a page of the site, a post.
  links?: readonly LinkItem[] | undefined;
};

export function AboutSection({ title, children, photos = [], links = [] }: AboutSectionProps) {
  return (
    <section className="py-about-section">
      <Text variant="heading" as="h2">
        {title}
      </Text>
      <Prose>{children}</Prose>
      {photos.length === 0 ? null : (
        <div className="py-about-section-photos">
          {photos.map((photo) => (
            <Picture key={photo.src} image={photo} ratio="4:3" />
          ))}
        </div>
      )}
      {links.length === 0 ? null : <LinkList links={links} />}
    </section>
  );
}
