import assert from "node:assert/strict";
import { test } from "node:test";
import { projectBaseCss, projectTokensCss, type Tokens, tokensCss } from "./tokens-css.ts";

const tokens: Tokens = {
  name: "pylon",
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

// The copy on Claude Design: tokens.css in the layout its page reads, and what the components'
// stylesheet needs beside it.
const project = projectTokensCss(tokens);
const base = projectBaseCss(tokens);

test("the copy's tokens.css starts with the line by which its page knows the file", () => {
  assert.equal(project.split("\n")[0], "/* pylon — generated from tokens.json */");
});

test("the copy's tokens.css follows data-theme only, which its page sets on every card", () => {
  assert.ok(project.includes(':root, [data-theme="light"] {\n  --color-ink: #111111;\n}'));
  assert.ok(project.includes('[data-theme="dark"] {\n  --color-ink: #eeeeee;\n}'));
  assert.ok(!project.includes("prefers-color-scheme"));
});

test("the copy's tokens.css spells a text style out in its class", () => {
  assert.ok(
    project.includes(
      "\n.text-label { font-family: var(--font-sans); font-size: 0.875rem; line-height: 1.5; font-weight: 600; letter-spacing: 0.04em; }\n",
    ),
  );
});

test("what the components read beside the copy's tokens.css is declared for them", () => {
  // A stylesheet sets `font: var(--text-body)`, which the page's layout has no variable for.
  assert.ok(base.includes("  --text-body: 400 1rem/1.9 var(--font-sans);"));
  // The class as the sites have it, figures included, after the page's own.
  assert.ok(base.includes("font-variant-numeric: tabular-nums;"));
  // The browser's own parts, and a frame in a text, follow the card's theme.
  assert.ok(base.includes('[data-theme="dark"] { color-scheme: dark; }'));
  // No value of a token is said a second time.
  assert.ok(!base.includes("--color-ink:"));
  assert.ok(!base.includes("--space-1:"));
});
