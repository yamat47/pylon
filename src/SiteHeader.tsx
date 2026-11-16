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
  const Name = heading ? "h1" : "p";
  return (
    <header className="py-site-header">
      <div>
        <Name className="py-site-header-name text-site">
          <a className="py-plain-link" href={href}>
            {name}
          </a>
        </Name>
        {description === undefined ? null : (
          <p className="py-site-header-description text-caption">{description}</p>
        )}
      </div>
      {nav.length === 0 ? null : (
        <nav className="text-small">
          <ul className="py-link-list">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
