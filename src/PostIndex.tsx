import { IndexList } from "./IndexList.tsx";
import { byYear, type IndexedPost } from "./post-index.ts";

type PostIndexProps = {
  // In the order to show them, newest first.
  posts: readonly IndexedPost[];
};

export function PostIndex({ posts }: PostIndexProps) {
  return <IndexList groups={byYear(posts)} />;
}
