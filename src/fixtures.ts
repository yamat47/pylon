// What the stories show: the blog's own names, links and posts, so that a component is looked at
// with the Japanese text it will carry.
import type { IndexedPost } from "./post-index.ts";
import type { LinkItem } from "./types.ts";

export const site = {
  name: "blog.yamat47.me",
  href: "/",
  description: "Notes by yamat47",
};

export const nav: readonly LinkItem[] = [{ label: "検索", href: "/search" }];

export const footerLinks: readonly LinkItem[] = [
  { label: "プライバシーポリシー", href: "/privacy" },
];

// The post whose text the stories of a post show (fixture-texts.tsx).
export const splittingStories: IndexedPost = {
  date: "2025-02-13",
  href: "/entry/2025/02/13/192603",
  title: "開発のストーリー分割・タスク分割をするときに考えていること",
};

export const posts: readonly IndexedPost[] = [
  { date: "2026-01-01", href: "/entry/2026/01/01/130022", title: "2025年を振り返ってみる" },
  {
    date: "2025-10-14",
    href: "/entry/2025/10/14/220005",
    title: "「絶不調」がつづいていたら気をつけろ、と伝えている",
  },
  {
    date: "2025-09-18",
    href: "/entry/2025/09/18/083019",
    title: "ポストモーテムを意味のあるものにするには？",
  },
  {
    date: "2025-09-07",
    href: "/entry/2025/09/07/194400",
    title: "『龍が如く』のナンバリングを全部プレーした or 実況を観た",
  },
  { date: "2025-04-14", href: "/entry/2025/04/14/074406", title: "結婚をして、式を挙げた" },
  splittingStories,
  { date: "2024-12-31", href: "/entry/2024/12/31/174853", title: "2024年を振り返ってみる" },
  {
    date: "2022-12-31",
    href: "/entry/2022/12/31/165912",
    title: "2022年を振り返ってみる（仕事、アメフト、Netflix、推し活、...）",
  },
  { date: "2022-11-11", href: "/entry/2022/11/11/204028", title: "クラッソーネを退職しました" },
];

// A grey picture, standing in for a photograph or a thumbnail.
export const picture =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='960' height='320'%3E%3Crect width='100%25' height='100%25' fill='%23bdbdbd'/%3E%3C/svg%3E";

// The page one of the posts links to, as a link card shows it.
export const linkedPage = {
  href: "https://nikkie-ftnext.hatenablog.com/entry/how-to-split-user-stories-not-split-into-tasks-202305",
  title: "ユーザストーリーをタスクに分解しないための考え方をさがして - nikkie-ftnextの日記",
  description:
    "はじめに 親父...1 nikkieです。 ユーザストーリーの分割について、いくつかの書籍に渡ったつながりを発見しました！ 現時点のバックアップとしてアウトプットします。",
  site: "nikkie-ftnextの日記",
};

// The blog's privacy policy: a page with a title and no date.
export const privacy = {
  title: "プライバシーポリシー",
  heading: "アクセス解析について",
  text: "当サイトでは、Google によるアクセス解析ツール「Google アナリティクス」を使用しています。Google アナリティクスは、データの収集のために Cookie を使用しています。このデータは匿名で収集されており、個人を特定するものではありません。",
};
