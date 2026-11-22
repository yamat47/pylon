import assert from "node:assert/strict";
import { test } from "node:test";
import { goesOn, tenure } from "./career-list.ts";

test("the time at a company runs from its first role's start to its latest role's end", () => {
  const company = {
    name: "A company",
    roles: [
      { title: "Manager", start: "2022-04", end: "2022-10" },
      { title: "Engineer", start: "2020-06", end: "2022-03" },
    ],
  } as const;
  assert.equal(tenure(company), "2020.06 – 2022.10");
});

test("the time at a company whose latest role goes on has not ended", () => {
  const company = {
    name: "A company",
    roles: [
      { title: "Manager", start: "2025-05" },
      { title: "Engineer", start: "2022-12", end: "2025-04" },
    ],
  } as const;
  assert.equal(tenure(company), "2022.12 –");
  assert.equal(goesOn(company.roles[0]), true);
  assert.equal(goesOn(company.roles[1]), false);
});
