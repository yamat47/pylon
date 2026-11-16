import { LinkList } from "./LinkList.tsx";
import { Text } from "./Text.tsx";
import type { LinkItem } from "./types.ts";

type SiteHeaderProps = {
  // The site's name, linked to the top page.
  name: string;
  href: string;
  // One line under the name.
  description?: string | undefined;
  // True on the page whose title is the site's name, the top page: the name is then the page's
  // h1. Every other page has a title of its own.
  heading?: boolean | undefined;
  nav?: readonly LinkItem[] | undefined;
};

export function SiteHeader({
  name,
  href,
  description,
  heading = false,
  nav = [],
}: SiteHeaderProps) {
  return (
    <header className="py-site-header">
      <div>
        <Text variant="site" as={heading ? "h1" : "p"}>
          <a className="py-plain-link" href={href}>
            {name}
          </a>
        </Text>
        {description === undefined ? null : (
          <Text variant="caption" tone="muted">
            {description}
          </Text>
        )}
      </div>
      {nav.length === 0 ? null : (
        <nav>
          <LinkList links={nav} />
        </nav>
      )}
    </header>
  );
}
