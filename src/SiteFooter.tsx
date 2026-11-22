import { LinkList } from "./LinkList.tsx";
import { Text } from "./Text.tsx";
import type { LinkGroup } from "./types.ts";

type SiteFooterProps = {
  // The site's name, or the person's on the portfolio, linked to the top page.
  name: string;
  href: string;
  // One line under the name.
  description?: string | undefined;
  // In the order to show them: the site's pages, elsewhere, the language.
  groups: readonly LinkGroup[];
  // Who holds the copyright of the site, and the year it is stated for.
  copyright: { readonly year: number; readonly holder: string };
};

export function SiteFooter({ name, href, description, groups, copyright }: SiteFooterProps) {
  return (
    // The band takes its color from the page's theme, and what is on it is drawn in the dark
    // theme's colors whatever the page's theme is.
    <footer className="py-site-footer">
      <div className="py-site-footer-content" data-theme="dark">
        <div className="py-site-footer-columns">
          <div className="py-site-footer-name">
            <Text variant="heading">
              <a className="py-plain-link" href={href}>
                {name}
              </a>
            </Text>
            {description === undefined ? null : (
              <Text variant="small" tone="muted">
                {description}
              </Text>
            )}
          </div>
          <div className="py-site-footer-groups">
            {groups.map((group) => (
              <div className="py-site-footer-group" key={group.label}>
                <Text variant="label" tone="muted">
                  {group.label}
                </Text>
                <LinkList links={group.links} stacked />
              </div>
            ))}
          </div>
        </div>
        <p className="py-site-footer-copyright py-text py-muted text-small">
          © {copyright.year} {copyright.holder}
        </p>
      </div>
    </footer>
  );
}
