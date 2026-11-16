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

const splittingStories = "開発のストーリー分割・タスク分割をするときに考えていること";

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
  {
    date: "2025-02-13",
    href: "/entry/2025/02/13/192603",
    title: splittingStories,
  },
  { date: "2024-12-31", href: "/entry/2024/12/31/174853", title: "2024年を振り返ってみる" },
  {
    date: "2022-12-31",
    href: "/entry/2022/12/31/165912",
    title: "2022年を振り返ってみる（仕事、アメフト、Netflix、推し活、...）",
  },
  { date: "2022-11-11", href: "/entry/2022/11/11/204028", title: "クラッソーネを退職しました" },
];

// One post, as far as a story needs it.
export const post = {
  title: splittingStories,
  lead: "たまたまかもですが 1on1 で二人連続でこんな話になったので。需要があるかもと思い、自分が普段考えていることをメモしてみます。",
};
