import type { ReactNode } from "react";
import { Text } from "./Text.tsx";
import type { Language, LinkItem } from "./types.ts";

type IntroductionProps = {
  // The page's language: the paragraph is set in `text-lead-latin` on an English page.
  lang: Language;
  // The paragraph.
  children: ReactNode;
  // A link under the paragraph to where the person says more: "More about me".
  more?: LinkItem | undefined;
};

export function Introduction({ lang, children, more }: IntroductionProps) {
  return (
    <div className="py-introduction">
      <Text variant={lang === "en" ? "lead-latin" : "lead"}>{children}</Text>
      {more === undefined ? null : (
        <p className="py-text text-small">
          <a href={more.href}>{more.label}</a>
        </p>
      )}
    </div>
  );
}
