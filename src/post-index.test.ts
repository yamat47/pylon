import assert from "node:assert/strict";
import { test } from "node:test";
import { byYear, day, type IndexedPost } from "./post-index.ts";

const post = (date: string): IndexedPost => ({ date, title: date, href: `/${date}` });

test("no posts make no years", () => {
  assert.deepEqual(byYear([]), []);
});

test("a year starts where the year changes, and keeps its posts in the order given", () => {
  const posts = ["2026-01-01", "2025-10-14", "2025-02-13", "2024-12-31"].map(post);
  assert.deepEqual(
    byYear(posts).map(([year, ofYear]) => [year, ofYear.map((each) => each.date)]),
    [
      ["2026", ["2026-01-01"]],
      ["2025", ["2025-10-14", "2025-02-13"]],
      ["2024", ["2024-12-31"]],
    ],
  );
});

test("a year is one group even when its posts are not given together", () => {
  const posts = ["2025-10-14", "2024-12-31", "2025-02-13"].map(post);
  assert.deepEqual(
    byYear(posts).map(([year, ofYear]) => [year, ofYear.length]),
    [
      ["2025", 2],
      ["2024", 1],
    ],
  );
});

test("a day is the month and the day of the date, with a full stop between", () => {
  assert.equal(day("2025-02-13"), "02.13");
});
