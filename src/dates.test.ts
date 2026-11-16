import assert from "node:assert/strict";
import { test } from "node:test";
import { fullDate, monthDay } from "./dates.ts";

test("a date is written with full stops, in the order it is given", () => {
  assert.equal(fullDate("2025-02-13"), "2025.02.13");
});

test("where the year stands beside it, a date is its month and day", () => {
  assert.equal(monthDay("2025-02-13"), "02.13");
});
