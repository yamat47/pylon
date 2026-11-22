import { fullDate, monthDay } from "./dates.ts";
import { type Article, articlesByYear } from "./writing-list.ts";

type WritingListProps = {
  // In the order to show them, newest first.
  articles: readonly Article[];
  // True on the page of writing: the articles go under their years, and each is dated by its
  // month and day.
  grouped?: boolean | undefined;
};

// The articles as rows, each dated by `written`.
function Articles({
  articles,
  written,
}: {
  articles: readonly Article[];
  written: (date: string) => string;
}) {
  return (
    <ul className="py-writing-list">
      {articles.map((article) => (
        <li className="py-writing-list-item" key={article.href}>
          <h3 className="py-text text-entry">
            <a className="py-plain-link py-phrases" href={article.href} lang={article.lang}>
              {article.title}
            </a>
          </h3>
          <time className="py-muted text-figure" dateTime={article.date}>
            {written(article.date)}
          </time>
        </li>
      ))}
    </ul>
  );
}

export function WritingList({ articles, grouped = false }: WritingListProps) {
  if (!grouped) return <Articles articles={articles} written={fullDate} />;
  return (
    <div className="py-writing-years">
      {articlesByYear(articles).map((group) => (
        <section key={group.year}>
          <h2 className="py-writing-year py-text py-muted text-label">{group.year}</h2>
          <Articles articles={group.articles} written={monthDay} />
        </section>
      ))}
    </div>
  );
}
