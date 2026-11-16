import assert from "node:assert/strict";
import { test } from "node:test";
import source from "../system/tokens.json" with { type: "json" };
import { hostedFamilies } from "./hosted-fonts.ts";

test("the copy names the two fonts as Google Fonts does, and leaves the rest of a stack", () => {
  assert.deepEqual(
    hostedFamilies({
      sans: '"Inter Variable", "Noto Sans JP Variable", "Hiragino Sans", sans-serif',
      mono: "ui-monospace, monospace",
    }),
    {
      sans: '"Inter", "Noto Sans JP", "Hiragino Sans", sans-serif',
      mono: "ui-monospace, monospace",
    },
  );
});

test("the tokens' own stacks can be given hosted names", () => {
  const { sans } = hostedFamilies(source.type.families);
  assert.ok(sans?.startsWith('"Inter", "Noto Sans JP", '));
});

test("a font the stacks no longer name is refused, not skipped", () => {
  assert.throws(
    () => hostedFamilies({ sans: '"Inter Variable", "Zen Kaku Gothic New", sans-serif' }),
    /no font stack names "Noto Sans JP Variable"/,
  );
});
