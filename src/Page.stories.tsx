import type { Meta, StoryObj } from "@storybook/react-vite";
import { foundItems, postBody } from "./fixture-texts.tsx";
import { footerLinks, nav, posts, privacy, search, site, splittingStories } from "./fixtures.ts";
import readme from "./Page.md?raw";
import { Page } from "./Page.tsx";
import { PageHeader } from "./PageHeader.tsx";
import { PostIndex } from "./PostIndex.tsx";
import { Prose } from "./Prose.tsx";
import { SearchField } from "./SearchField.tsx";
import { SearchResults } from "./SearchResults.tsx";
import { SiteFooter } from "./SiteFooter.tsx";
import { SiteHeader } from "./SiteHeader.tsx";

const meta = {
  // First in the sidebar: a page is where the components are seen together.
  title: "Pages/Page",
  component: Page,
  parameters: { docs: { description: { component: readme } } },
  args: { footer: <SiteFooter links={footerLinks} /> },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

// The blog's top page.
export const TopPage: Story = {
  args: {
    width: "wide",
    header: <SiteHeader {...site} nav={nav} heading />,
    children: <PostIndex posts={posts} />,
  },
};

// A post: its title under its date, then its text, in a column to read.
export const PostPage: Story = {
  args: {
    width: "text",
    header: <SiteHeader {...site} nav={nav} />,
    children: (
      <article>
        <PageHeader title={splittingStories.title} date={splittingStories.date} />
        <Prose>{postBody}</Prose>
      </article>
    ),
  },
};

// A page with a title and no date, as the privacy policy is.
export const TitledPage: Story = {
  args: {
    width: "text",
    header: <SiteHeader {...site} nav={nav} />,
    children: (
      <>
        <PageHeader title={privacy.title} />
        <Prose>
          <h2>{privacy.heading}</h2>
          <p>{privacy.text}</p>
        </Prose>
      </>
    ),
  },
};

// The search page after a search: its title, the field, and what was found.
export const SearchPage: Story = {
  args: {
    width: "text",
    header: <SiteHeader {...site} nav={nav} />,
    children: (
      <>
        <PageHeader title={search.title} />
        <SearchField {...search.field} />
        <SearchResults {...search.results} status={search.status}>
          {foundItems}
        </SearchResults>
      </>
    ),
  },
};
