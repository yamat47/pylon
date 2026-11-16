// src/tokens.css as text, from the tokens (system/tokens.json). A site that loads the file follows
// the reader's system between light and dark, and can fix either one with `data-theme` on an
// element.
export const THEMES = ["light", "dark"] as const;
export type Theme = (typeof THEMES)[number];
type Value = string | Readonly<Record<Theme, string>>;
type Token = { readonly name: string; readonly value: Value };
type Style = {
  readonly name: string;
  readonly fontSize: string;
  readonly lineHeight: string;
  readonly fontWeight: number;
  readonly letterSpacing?: string | undefined;
  readonly fontVariantNumeric?: string | undefined;
};
export type Tokens = {
  readonly color: { readonly tokens: readonly Token[] };
  readonly type: {
    readonly families: Readonly<Record<string, string>>;
    readonly groups: readonly { readonly family: string; readonly styles: readonly Style[] }[];
  };
  readonly spacing: { readonly tokens: readonly Token[] };
  readonly radius: { readonly tokens: readonly Token[] };
  readonly stroke: { readonly tokens: readonly Token[] };
  readonly shadow: { readonly tokens: readonly Token[] };
};

const isThemed = (token: Token) => typeof token.value !== "string";

const declare = (tokens: readonly Token[], theme: Theme, indent = "  ") =>
  tokens.map((token) => {
    const value = typeof token.value === "string" ? token.value : token.value[theme];
    return `${indent}--${token.name}: ${value};`;
  });

const families = (tokens: Tokens) =>
  Object.entries(tokens.type.families).map(([name, stack]) => `  --font-${name}: ${stack};`);

const styles = (tokens: Tokens) =>
  tokens.type.groups.flatMap((group) =>
    group.styles.map((style) => ({ ...style, family: group.family })),
  );

// A text style as one value of the `font` shorthand. A stylesheet that cannot put a class on an
// element, such as the one for a post's rendered Markdown, sets `font: var(--text-heading)`.
const styleVariables = (tokens: Tokens) =>
  styles(tokens).map(
    (style) =>
      `  --${style.name}: ${style.fontWeight} ${style.fontSize}/${style.lineHeight} var(--font-${style.family});`,
  );

// The same style as a class, with what the shorthand cannot hold. The shorthand resets the
// figures, so they are set after it.
const styleClasses = (tokens: Tokens) =>
  styles(tokens).map((style) => {
    const declarations = [
      `font: var(--${style.name});`,
      ...(style.letterSpacing === undefined ? [] : [`letter-spacing: ${style.letterSpacing};`]),
      ...(style.fontVariantNumeric === undefined
        ? []
        : [`font-variant-numeric: ${style.fontVariantNumeric};`]),
    ];
    return `.${style.name} { ${declarations.join(" ")} }`;
  });

export function tokensCss(tokens: Tokens): string {
  const all = [
    ...tokens.color.tokens,
    ...tokens.spacing.tokens,
    ...tokens.radius.tokens,
    ...tokens.stroke.tokens,
    ...tokens.shadow.tokens,
  ];
  const themed = all.filter(isThemed);
  const fixed = all.filter((token) => !isThemed(token));
  return [
    "/* Generated from system/tokens.json by scripts/tokens.ts. Edit the tokens, then run `make tokens`. */",
    ":root {",
    ...declare(fixed, "light"),
    ...families(tokens),
    ...styleVariables(tokens),
    "}",
    ":root,",
    '[data-theme="light"] {',
    // The browser's own parts (form controls, scrollbars) follow the same theme.
    "  color-scheme: light;",
    ...declare(themed, "light"),
    "}",
    '[data-theme="dark"] {',
    "  color-scheme: dark;",
    ...declare(themed, "dark"),
    "}",
    "@media (prefers-color-scheme: dark) {",
    '  :root:not([data-theme="light"]) {',
    "    color-scheme: dark;",
    ...declare(themed, "dark", "    "),
    "  }",
    "}",
    ...styleClasses(tokens),
    "",
  ].join("\n");
}
