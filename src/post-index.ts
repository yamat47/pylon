// What PostIndex works out from its posts: the groups an IndexList draws.
import { monthDay } from "./dates.ts";
import type { IndexGroup } from "./types.ts";

export type IndexedPost = {
  readonly title: string;
  readonly href: string;
  // The day the site dates the post, as YYYY-MM-DD. The site decides the time zone; the index only
  // reads the year, the month and the day out of it.
  readonly date: string;
};

// The posts of each year under that year, years and posts in the order they were given.
export function byYear(posts: readonly IndexedPost[]): IndexGroup[] {
  const years = Map.groupBy(posts, (post) => post.date.slice(0, 4));
  return [...years].map(([year, ofYear]) => ({
    label: year,
    items: ofYear.map((post) => ({
      title: post.title,
      href: post.href,
      figure: monthDay(post.date),
      dateTime: post.date,
    })),
  }));
}
