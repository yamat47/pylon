import assert from "node:assert/strict";
import { test } from "node:test";
import { contrast } from "./contrast.ts";

test("black on white is 21:1, whichever is named first", () => {
  assert.equal(contrast("#000000", "#ffffff"), 21);
  assert.equal(contrast("#FFFFFF", "#000000"), 21);
});

test("a color against itself is 1:1", () => {
  assert.equal(contrast("#767676", "#767676"), 1);
});

test("#767676 is the lightest grey that passes 4.5:1 on white", () => {
  assert.ok(contrast("#767676", "#ffffff") >= 4.5);
  assert.ok(contrast("#777777", "#ffffff") < 4.5);
});

test("a color that is not #rrggbb is refused", () => {
  assert.throws(() => contrast("#fff", "#000000"), /not a #rrggbb color/);
});
