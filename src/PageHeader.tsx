import { dataAttributes } from "./data-attributes.ts";
import { fullDate } from "./dates.ts";
import { Text } from "./Text.tsx";
import type { DataAttributes } from "./types.ts";

type PageHeaderProps = {
  // The page's title, and its h1.
  title: string;
  // For a page that has one, such as a post: the day the site dates it, as YYYY-MM-DD.
  date?: string | undefined;
  // Written on the date's `time`, for the site's own tools: a search index that takes the date
  // from there, or leaves it out of the text it searches.
  dateAttributes?: DataAttributes | undefined;
};

export function PageHeader({ title, date, dateAttributes }: PageHeaderProps) {
  return (
    <header className="py-page-header py-phrases">
      {date === undefined ? null : (
        <time className="py-muted text-label" dateTime={date} {...dataAttributes(dateAttributes)}>
          {fullDate(date)}
        </time>
      )}
      <Text variant="title" as="h1">
        {title}
      </Text>
    </header>
  );
}
