// What WritingList works out from its articles: the years it groups them under.
import type { IndexedPost } from "./post-index.ts";

// A piece of writing, as a post is given to an index, with the language of its title where that
// is not the page's: a Japanese post keeps its Japanese title on an English page.
export type Article = IndexedPost & { readonly lang?: string | undefined };

// The articles of each year under that year, years and articles in the order they were given.
export function articlesByYear(
  articles: readonly Article[],
): { year: string; articles: readonly Article[] }[] {
  const years = Map.groupBy(articles, (article) => article.date.slice(0, 4));
  return [...years].map(([year, ofYear]) => ({ year, articles: ofYear }));
}
