import assert from "node:assert/strict";
import { test } from "node:test";
import source from "../system/tokens.json" with { type: "json" };
import { TEXT_VARIANTS } from "./text-variants.ts";

test("a Text can be set in every text style of the tokens, and in nothing else", () => {
  const styles = source.type.groups.flatMap((group) => group.styles.map((style) => style.name));
  assert.deepEqual(
    TEXT_VARIANTS.map((variant) => `text-${variant}`),
    styles,
  );
});
