import assert from "node:assert/strict";
import { test } from "node:test";
import { byYear, type IndexedPost } from "./post-index.ts";

const post = (date: string): IndexedPost => ({ date, title: date, href: `/${date}` });

// Each group as its label and the dates of its rows.
const shape = (posts: readonly IndexedPost[]) =>
  byYear(posts).map((group) => [group.label, group.items.map((item) => item.dateTime)]);

test("no posts make no years", () => {
  assert.deepEqual(byYear([]), []);
});

test("a year starts where the year changes, and keeps its posts in the order given", () => {
  assert.deepEqual(shape(["2026-01-01", "2025-10-14", "2025-02-13", "2024-12-31"].map(post)), [
    ["2026", ["2026-01-01"]],
    ["2025", ["2025-10-14", "2025-02-13"]],
    ["2024", ["2024-12-31"]],
  ]);
});

test("a year is one group even when its posts are not given together", () => {
  assert.deepEqual(shape(["2025-10-14", "2024-12-31", "2025-02-13"].map(post)), [
    ["2025", ["2025-10-14", "2025-02-13"]],
    ["2024", ["2024-12-31"]],
  ]);
});

test("a post becomes a row with its day as the figure, since the year stands beside the group", () => {
  assert.deepEqual(byYear([{ date: "2025-02-13", title: "A title", href: "/a" }]), [
    {
      label: "2025",
      items: [{ title: "A title", href: "/a", figure: "02.13", dateTime: "2025-02-13" }],
    },
  ]);
});
