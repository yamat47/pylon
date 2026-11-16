import { byYear, day, type IndexedPost } from "./post-index.ts";

type PostIndexProps = {
  // In the order to show them, newest first.
  posts: readonly IndexedPost[];
};

export function PostIndex({ posts }: PostIndexProps) {
  return (
    <div>
      {byYear(posts).map(([year, ofYear]) => (
        <section className="py-post-index-year" key={year}>
          <h2 className="py-post-index-label text-label">{year}</h2>
          <ul className="py-post-index-posts">
            {ofYear.map((post) => (
              <li className="py-post-index-post" key={post.href}>
                <time className="py-post-index-day text-figure" dateTime={post.date}>
                  {day(post.date)}
                </time>
                <a className="py-post-index-title text-entry" href={post.href}>
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
