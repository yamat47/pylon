import assert from "node:assert/strict";
import { test } from "node:test";
import { dataAttributes } from "./data-attributes.ts";

test("the data attributes a site gives are kept as they are", () => {
  assert.deepEqual(dataAttributes({ "data-search": "skip", "data-kind": "" }), {
    "data-search": "skip",
    "data-kind": "",
  });
});

test("anything that is not a data attribute is left out", () => {
  const given = {
    "data-search": "skip",
    className: "mine",
    onClick: () => {},
    dangerouslySetInnerHTML: { __html: "<script></script>" },
  };
  assert.deepEqual(dataAttributes(given), { "data-search": "skip" });
});

test("a data attribute without a text is left out", () => {
  assert.deepEqual(dataAttributes({ "data-search": undefined, "data-count": 3 }), {});
});

test("nothing given is no attribute", () => {
  assert.deepEqual(dataAttributes(undefined), {});
});
