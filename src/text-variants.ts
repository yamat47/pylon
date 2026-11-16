// The text styles a Text can be set in: the styles of system/tokens.json, less the `text-` every
// one of them starts with. A test keeps the two lists the same.
export const TEXT_VARIANTS = [
  "title",
  "heading",
  "entry",
  "body",
  "small",
  "caption",
  "label",
  "figure",
  "site",
  "code",
] as const;

export type TextVariant = (typeof TEXT_VARIANTS)[number];
