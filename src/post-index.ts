// What PostIndex works out from its posts before drawing anything.

export type IndexedPost = {
  readonly title: string;
  readonly href: string;
  // The day the site dates the post, as YYYY-MM-DD. The site decides the time zone; the index only
  // reads the year, the month and the day out of it.
  readonly date: string;
};

// The posts of each year, years and posts in the order they were given.
export function byYear(posts: readonly IndexedPost[]): [year: string, posts: IndexedPost[]][] {
  return [...Map.groupBy(posts, (post) => post.date.slice(0, 4))];
}

// 2025-02-13 as 02.13: the year stands beside the group.
export const day = (date: string) => `${date.slice(5, 7)}.${date.slice(8, 10)}`;
