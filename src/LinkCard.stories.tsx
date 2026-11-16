import type { Meta, StoryObj } from "@storybook/react-vite";
import { linkedPage, picture, posts, site } from "./fixtures.ts";
import readme from "./LinkCard.md?raw";
import { LinkCard } from "./LinkCard.tsx";

// A post of the same site, as the card of a link to it shows it.
const [ownPost] = posts;
if (!ownPost) throw new Error("the fixtures have no post");

const meta = {
  title: "Text/LinkCard",
  component: LinkCard,
  parameters: { docs: { description: { component: readme } } },
  args: linkedPage,
} satisfies Meta<typeof LinkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithThumbnail: Story = { args: { image: picture } };
export const WithoutThumbnail: Story = {};
// A page that gives no description, with the day it was published.
export const TitleSiteAndDate: Story = {
  args: {
    href: ownPost.href,
    title: ownPost.title,
    description: undefined,
    site: site.name,
    date: ownPost.date,
  },
};
// A thumbnail that does not load leaves its place tinted.
export const ThumbnailThatFails: Story = { args: { image: "/no-such-picture.png" } };
