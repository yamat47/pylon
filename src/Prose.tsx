import type { ReactNode } from "react";

type ProseProps = {
  // The blocks of a text: paragraphs, headings, lists, quotes, images, link cards.
  children: ReactNode;
};

export function Prose({ children }: ProseProps) {
  return <div className="py-prose">{children}</div>;
}
