import type { LinkItem } from "./types.ts";

type LinkListProps = {
  links: readonly LinkItem[];
  // True for links one under another, such as the pages in a profile column or a group in the
  // footer. They are known to be links by where they are, so only the current one is underlined.
  stacked?: boolean | undefined;
};

export function LinkList({ links, stacked = false }: LinkListProps) {
  return (
    <ul className={`py-link-list${stacked ? " py-link-list-stacked" : ""} text-small`}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            className={stacked && link.current !== true ? "py-plain-link" : undefined}
            href={link.href}
            aria-current={link.current === true ? "page" : undefined}
            lang={link.lang}
            hrefLang={link.lang}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
