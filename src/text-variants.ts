// The text styles a Text can be set in: the styles of system/tokens.json, less the `text-` every
// one of them starts with. A test keeps the two lists the same, but for `code`: code is set by
// Prose, on the elements code is written in.
export const TEXT_VARIANTS = [
  "title",
  "heading",
  "subheading",
  "minor-heading",
  "entry",
  "lead",
  "lead-latin",
  "body",
  "body-latin",
  "small",
  "caption",
  "label",
  "figure",
  "site",
] as const;

export type TextVariant = (typeof TEXT_VARIANTS)[number];
