import type { Meta, StoryObj } from "@storybook/react-vite";
import { footerLinks, nav, post, posts, site } from "./fixtures.ts";
import readme from "./Page.md?raw";
import { Page } from "./Page.tsx";
import { PostIndex } from "./PostIndex.tsx";
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

// A column to read, as a post has. What a post is made of comes with its own components.
export const TextPage: Story = {
  args: {
    width: "text",
    header: <SiteHeader {...site} nav={nav} />,
    children: (
      <>
        <h1 className="text-title">{post.title}</h1>
        <p>{post.lead}</p>
      </>
    ),
  },
};
