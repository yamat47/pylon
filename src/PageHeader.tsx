import { fullDate } from "./dates.ts";
import { Text } from "./Text.tsx";

type PageHeaderProps = {
  // The page's title, and its h1.
  title: string;
  // For a page that has one, such as a post: the day the site dates it, as YYYY-MM-DD.
  date?: string | undefined;
};

export function PageHeader({ title, date }: PageHeaderProps) {
  return (
    <header className="py-page-header py-phrases">
      {date === undefined ? null : (
        <time className="py-muted text-label" dateTime={date}>
          {fullDate(date)}
        </time>
      )}
      <Text variant="title" as="h1">
        {title}
      </Text>
    </header>
  );
}
