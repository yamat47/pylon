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
  readonly name: string;
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

// Every token but the text styles: those with a value per theme, and those with one value.
function byTheme(tokens: Tokens): { themed: Token[]; fixed: Token[] } {
  const all = [
    ...tokens.color.tokens,
    ...tokens.spacing.tokens,
    ...tokens.radius.tokens,
    ...tokens.stroke.tokens,
    ...tokens.shadow.tokens,
  ];
  return { themed: all.filter(isThemed), fixed: all.filter((token) => !isThemed(token)) };
}

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
  const { themed, fixed } = byTheme(tokens);
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

// The same tokens for the copy of the design system on Claude Design (design/project/tokens.css).
// Its page writes this file itself for a system edited there and writes nothing for one kept in
// code, whose build is asked to bring the file as the page would lay it out, under the first line
// by which the page knows it: the themed values by `data-theme` alone, the rest on `:root`, and a
// class per text style with its properties spelled out.
export function projectTokensCss(tokens: Tokens): string {
  const { themed, fixed } = byTheme(tokens);
  return [
    `/* ${tokens.name} — generated from tokens.json */`,
    ':root, [data-theme="light"] {',
    ...declare(themed, "light"),
    "}",
    '[data-theme="dark"] {',
    ...declare(themed, "dark"),
    "}",
    ":root {",
    ...declare(fixed, "light"),
    ...families(tokens),
    "}",
    ...styles(tokens).map((style) => {
      const declarations = [
        `font-family: var(--font-${style.family});`,
        `font-size: ${style.fontSize};`,
        `line-height: ${style.lineHeight};`,
        `font-weight: ${style.fontWeight};`,
        ...(style.letterSpacing === undefined ? [] : [`letter-spacing: ${style.letterSpacing};`]),
      ];
      return `.${style.name} { ${declarations.join(" ")} }`;
    }),
    "",
  ].join("\n");
}

// What the components' stylesheet reads that the page's layout of the tokens has no place for:
// each text style as one `font` value, the classes as src/tokens.css writes them (a class there
// sets the figures too), and the browser's own parts following the theme. It is the head of the
// copy's components/bundle.css, so that it goes wherever the components' styles go.
export function projectBaseCss(tokens: Tokens): string {
  return [
    "/* Generated from system/tokens.json: what components.css reads beside tokens.css. */",
    ":root {",
    ...styleVariables(tokens),
    "}",
    ':root, [data-theme="light"] { color-scheme: light; }',
    '[data-theme="dark"] { color-scheme: dark; }',
    ...styleClasses(tokens),
    "",
  ].join("\n");
}
