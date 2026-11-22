import { fullDate } from "./dates.ts";
import { LinkList } from "./LinkList.tsx";
import { Picture } from "./Picture.tsx";
import type { Image, Talk } from "./types.ts";

type TalkFeatureProps = {
  talk: Talk;
  // The talk's first slide, 16:9. Left out, its place is tinted.
  slide?: Image | undefined;
  // The element of the title: `h2` where the talk is the page's content, under its h1, and `h3`
  // in a Section, under its heading.
  titleAs?: "h2" | "h3" | undefined;
};

export function TalkFeature({ talk, slide, titleAs: Title = "h2" }: TalkFeatureProps) {
  return (
    <article className="py-talk-feature">
      <Picture image={slide} ratio="16:9" />
      <p className="py-talk-feature-when py-text py-muted text-small">
        <time dateTime={talk.date}>{fullDate(talk.date)}</time>
        {talk.event === undefined ? null : (
          <>
            {" · "}
            <span lang={talk.event.lang}>{talk.event.name}</span>
          </>
        )}
      </p>
      <Title className="py-text py-phrases text-heading" lang={talk.lang}>
        {talk.title}
      </Title>
      <LinkList links={talk.links} />
    </article>
  );
}
