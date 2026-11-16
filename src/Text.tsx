import type { ReactNode } from "react";
import type { TextVariant } from "./text-variants.ts";

type TextProps = {
  // The text style, by its name in the tokens less `text-`.
  variant?: TextVariant | undefined;
  // What the text is in the document. The style does not follow from it: a page's title is an h1
  // in `title`, and the site's name on the top page is an h1 in `site`.
  as?: "h1" | "h2" | "h3" | "p" | "span" | undefined;
  // `muted` for what stands beside the text: a date, a caption.
  tone?: "ink" | "muted" | undefined;
  children: ReactNode;
};

export function Text({ variant = "body", as: Tag = "p", tone = "ink", children }: TextProps) {
  const muted = tone === "muted" ? " py-muted" : "";
  return <Tag className={`py-text text-${variant}${muted}`}>{children}</Tag>;
}
