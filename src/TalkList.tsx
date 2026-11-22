import { monthDay } from "./dates.ts";
import { LinkList } from "./LinkList.tsx";
import type { Talk } from "./types.ts";

type TalkListProps = {
  // In the order to show them, newest first.
  talks: readonly Talk[];
  // The element of each title: `h2` where the list is the page's content, under its h1, and `h3`
  // in a Section, under its heading.
  titleAs?: "h2" | "h3" | undefined;
};

export function TalkList({ talks, titleAs: Title = "h2" }: TalkListProps) {
  return (
    <ol className="py-talk-list">
      {talks.map((talk) => (
        <li className="py-talk" key={`${talk.date} ${talk.title}`}>
          <time className="py-talk-date" dateTime={talk.date}>
            <span className="py-muted text-label">{talk.date.slice(0, 4)}</span>
            <span className="py-talk-day text-heading">{monthDay(talk.date)}</span>
          </time>
          <div className="py-talk-body">
            <Title className="py-text py-phrases text-entry" lang={talk.lang}>
              {talk.title}
            </Title>
            {talk.event === undefined ? null : (
              <p className="py-text py-muted text-small" lang={talk.event.lang}>
                {talk.event.name}
              </p>
            )}
            <LinkList links={talk.links} />
          </div>
        </li>
      ))}
    </ol>
  );
}
