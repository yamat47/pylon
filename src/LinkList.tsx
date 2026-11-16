import type { LinkItem } from "./types.ts";

type LinkListProps = {
  links: readonly LinkItem[];
};

export function LinkList({ links }: LinkListProps) {
  return (
    <ul className="py-link-list text-small">
      {links.map((link) => (
        <li key={link.href}>
          <a href={link.href}>{link.label}</a>
        </li>
      ))}
    </ul>
  );
}
