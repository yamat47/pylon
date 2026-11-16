import { LinkList } from "./LinkList.tsx";
import type { LinkItem } from "./types.ts";

type SiteFooterProps = {
  links: readonly LinkItem[];
};

export function SiteFooter({ links }: SiteFooterProps) {
  return (
    <footer className="py-site-footer">
      <LinkList links={links} />
    </footer>
  );
}
