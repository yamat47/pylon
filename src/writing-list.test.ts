import assert from "node:assert/strict";
import { test } from "node:test";
import { type Article, articlesByYear } from "./writing-list.ts";

const article = (date: string): Article => ({ date, title: date, href: `/${date}` });

// Each year with the dates of its articles.
const shape = (articles: readonly Article[]) =>
  articlesByYear(articles).map((group) => [group.year, group.articles.map((each) => each.date)]);

test("no articles make no years", () => {
  assert.deepEqual(articlesByYear([]), []);
});

test("an article goes under the year of its date, and the years keep the order given", () => {
  assert.deepEqual(shape(["2026-01-01", "2025-10-14", "2024-12-31", "2025-02-13"].map(article)), [
    ["2026", ["2026-01-01"]],
    ["2025", ["2025-10-14", "2025-02-13"]],
    ["2024", ["2024-12-31"]],
  ]);
});
