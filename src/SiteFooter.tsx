import type { LinkItem } from "./types.ts";

type SiteFooterProps = {
  links: readonly LinkItem[];
};

export function SiteFooter({ links }: SiteFooterProps) {
  return (
    <footer className="py-site-footer text-small">
      <ul className="py-link-list">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
