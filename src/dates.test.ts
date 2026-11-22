import assert from "node:assert/strict";
import { test } from "node:test";
import { fullDate, monthDay, period } from "./dates.ts";

test("a date is written with full stops, in the order it is given", () => {
  assert.equal(fullDate("2025-02-13"), "2025.02.13");
});

test("where the year stands beside it, a date is its month and day", () => {
  assert.equal(monthDay("2025-02-13"), "02.13");
});

test("a period that has ended is its two months, with a dash between them", () => {
  assert.equal(period("2022-12", "2023-06"), "2022.12 – 2023.06");
});

test("a period that has not ended is its start and a dash", () => {
  assert.equal(period("2025-05"), "2025.05 –");
});

test("a period that began and ended in the same year is that year alone", () => {
  assert.equal(period("2021", "2021"), "2021");
});
