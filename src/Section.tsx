import type { ReactNode } from "react";
import { Text } from "./Text.tsx";
import type { LinkItem } from "./types.ts";

type SectionProps = {
  // The section's heading, an h2 under the page's h1.
  title: string;
  // The page that holds the whole of what the section shows a part of: "All 8 projects".
  more?: LinkItem | undefined;
  children: ReactNode;
};

export function Section({ title, more, children }: SectionProps) {
  return (
    <section className="py-section">
      <div className="py-section-head">
        <Text variant="heading" as="h2">
          {title}
        </Text>
        {more === undefined ? null : (
          <a className="text-small" href={more.href}>
            {more.label}
          </a>
        )}
      </div>
      {children}
    </section>
  );
}
