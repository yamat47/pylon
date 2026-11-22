import { LinkList } from "./LinkList.tsx";
import { Picture } from "./Picture.tsx";
import { Text } from "./Text.tsx";
import type { Image, LinkItem } from "./types.ts";

type ProfileAsideProps = {
  // The person's name, linked to the top page in the page's language.
  name: string;
  href: string;
  // One line under the name: what the person does.
  description?: string | undefined;
  // A square photo of the person. Left out, its place is tinted.
  photo?: Image | undefined;
  // True on the top page, whose title is the name: the name is then the page's h1.
  heading?: boolean | undefined;
  // The site's pages, with the one the reader is on marked `current`.
  pages: readonly LinkItem[];
  // Where else the person is: an address to write to, accounts on other sites.
  links?: readonly LinkItem[] | undefined;
  // The same page in the other language, with that language as its `lang`.
  language?: LinkItem | undefined;
};

export function ProfileAside({
  name,
  href,
  description,
  photo,
  heading = false,
  pages,
  links = [],
  language,
}: ProfileAsideProps) {
  return (
    <aside className="py-profile-aside">
      <div className="py-profile-aside-identity">
        <div className="py-profile-aside-photo">
          <Picture image={photo} ratio="1:1" />
        </div>
        <div className="py-profile-aside-name">
          <Text variant="heading" as={heading ? "h1" : "p"}>
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
      </div>
      <nav className="py-profile-aside-pages">
        <LinkList links={pages} stacked />
      </nav>
      {links.length === 0 && language === undefined ? null : (
        <div className="py-profile-aside-elsewhere">
          {links.length === 0 ? null : <LinkList links={links} />}
          {language === undefined ? null : <LinkList links={[language]} stacked />}
        </div>
      )}
    </aside>
  );
}
