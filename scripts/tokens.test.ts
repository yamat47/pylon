// Rules the tokens themselves must keep, checked on system/tokens.json as it is.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import source from "../system/tokens.json" with { type: "json" };
import { contrast } from "./contrast.ts";
import { THEMES, type Theme, tokensCss } from "./tokens-css.ts";

test("src/tokens.css is what the tokens generate (run `make tokens` after editing them)", async () => {
  const committed = await readFile(new URL("../src/tokens.css", import.meta.url), "utf8");
  assert.equal(committed, tokensCss(source));
});

function color(name: string, theme: Theme): string {
  const token = source.color.tokens.find((candidate) => candidate.name === name);
  if (!token) throw new Error(`no color token named ${name}`);
  return token.value[theme];
}

// WCAG 2's AA levels: 4.5:1 for text, 3:1 for a mark that carries meaning without being text.
const TEXT = 4.5;
const MARK = 3;

// The colors that are used together: what is drawn, what it is drawn on, and the least contrast
// the two must keep.
const SURFACES = ["color-surface", "color-surface-sunken"];
const INKS = ["color-ink", "color-ink-muted", "color-accent-ink"];
const PAIRS = [
  ...SURFACES.flatMap((surface) => INKS.map((ink) => ({ on: surface, drawn: ink, least: TEXT }))),
  { on: "color-surface", drawn: "color-accent", least: MARK },
  { on: "color-mark", drawn: "color-ink", least: TEXT },
];

// The footer is drawn in the dark theme under a page of either theme, so its text is checked in
// the dark theme's colors against the footer's band as each theme draws it.
const FOOTER = "color-surface-footer";
const ON_FOOTER = [
  ...INKS.map((ink) => ({ drawn: ink, least: TEXT })),
  { drawn: "color-accent", least: MARK },
];

// Colors that tell nothing by themselves, so no contrast is asked of them.
const DECORATION = ["color-border"];

for (const theme of THEMES) {
  for (const { on, drawn, least } of PAIRS) {
    test(`${drawn} on ${on} keeps ${least}:1 in ${theme}`, () => {
      assert.ok(contrast(color(drawn, theme), color(on, theme)) >= least);
    });
  }
  for (const { drawn, least } of ON_FOOTER) {
    test(`${drawn} of the dark theme on ${FOOTER} keeps ${least}:1 in ${theme}`, () => {
      assert.ok(contrast(color(drawn, "dark"), color(FOOTER, theme)) >= least);
    });
  }
}

test("every color is in a pair whose contrast is checked, or is named as decoration", () => {
  const checked = new Set([
    ...PAIRS.flatMap((pair) => [pair.on, pair.drawn]),
    FOOTER,
    ...DECORATION,
  ]);
  const unchecked = source.color.tokens
    .map((token) => token.name)
    .filter((name) => !checked.has(name));
  assert.deepEqual(unchecked, []);
});

test("every token and every text style says what it is for", () => {
  const described = [
    ...source.color.tokens,
    ...source.spacing.tokens,
    ...source.radius.tokens,
    ...source.stroke.tokens,
    ...source.type.groups.flatMap((group) => group.styles),
  ];
  const silent = described.filter((item) => item.usage.trim() === "").map((item) => item.name);
  assert.deepEqual(silent, []);
});

test("every group of text styles names a font family that exists", () => {
  const families = Object.keys(source.type.families);
  const unknown = source.type.groups
    .map((group) => group.family)
    .filter((family) => !families.includes(family));
  assert.deepEqual(unknown, []);
});
