// What a site writes. It compiles only if the types the package publishes resolve and say what
// the components take: each `@ts-expect-error` below fails the compilation when the line under it
// stops being an error, which is what happens when the types do not reach a site at all.
import { type LinkItem, Page, PostIndex, SiteFooter, SiteHeader } from "@yamat47/pylon";

const links: LinkItem[] = [{ label: "Privacy", href: "/privacy" }];

export const page = (
  <Page
    width="wide"
    header={<SiteHeader name="A site" href="/" heading />}
    footer={<SiteFooter links={links} />}
  >
    <PostIndex posts={[{ title: "A post", href: "/entry/a", date: "2025-02-13" }]} />
  </Page>
);

// @ts-expect-error a label is text
export const wrongLink: LinkItem = { label: 1, href: "/" };

export const wrongWidth = (
  // @ts-expect-error a page is `wide` or `text`
  <Page width="narrow" header={null} footer={null}>
    {null}
  </Page>
);
