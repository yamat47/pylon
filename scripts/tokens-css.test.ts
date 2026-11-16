import assert from "node:assert/strict";
import { test } from "node:test";
import { type Tokens, tokensCss } from "./tokens-css.ts";

const tokens: Tokens = {
  color: { tokens: [{ name: "color-ink", value: { light: "#111111", dark: "#eeeeee" } }] },
  type: {
    families: { sans: '"Inter", sans-serif' },
    groups: [
      {
        family: "sans",
        styles: [
          { name: "text-body", fontSize: "1rem", lineHeight: "1.9", fontWeight: 400 },
          {
            name: "text-label",
            fontSize: "0.875rem",
            lineHeight: "1.5",
            fontWeight: 600,
            letterSpacing: "0.04em",
            fontVariantNumeric: "tabular-nums",
          },
        ],
      },
    ],
  },
  spacing: { tokens: [{ name: "space-1", value: "0.25rem" }] },
  radius: { tokens: [] },
  stroke: { tokens: [] },
  shadow: { tokens: [] },
};

const css = tokensCss(tokens);

// The declarations of the first rule with this selector, one per item.
function rule(selector: string): string[] {
  const start = css.indexOf(`${selector} {\n`);
  assert.notEqual(start, -1, `no rule for ${selector}`);
  const body = css.slice(start + selector.length + 3, css.indexOf("}", start));
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");
}

test("a color is light unless the reader's system or an element's data-theme says dark", () => {
  assert.deepEqual(rule(':root,\n[data-theme="light"]'), [
    "color-scheme: light;",
    "--color-ink: #111111;",
  ]);
  assert.deepEqual(rule('[data-theme="dark"]'), ["color-scheme: dark;", "--color-ink: #eeeeee;"]);
  assert.deepEqual(rule('  :root:not([data-theme="light"])'), [
    "color-scheme: dark;",
    "--color-ink: #eeeeee;",
  ]);
  assert.ok(
    css.includes('@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"])'),
  );
});

test("a token with one value is declared on the root only, so that data-theme does not reset it", () => {
  assert.equal(css.split("--space-1:").length - 1, 1);
  assert.ok(rule(":root").includes("--space-1: 0.25rem;"));
});

test("a text style is a font shorthand in a variable, for a stylesheet that cannot use its class", () => {
  assert.ok(rule(":root").includes("--text-body: 400 1rem/1.9 var(--font-sans);"));
  assert.ok(rule(":root").includes('--font-sans: "Inter", sans-serif;'));
});

test("a text style's class adds what the font shorthand cannot hold", () => {
  assert.ok(css.includes("\n.text-body { font: var(--text-body); }\n"));
  assert.ok(
    css.includes(
      "\n.text-label { font: var(--text-label); letter-spacing: 0.04em; font-variant-numeric: tabular-nums; }\n",
    ),
  );
});
