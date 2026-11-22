import type { Meta, StoryObj } from "@storybook/react-vite";
import { blogFooter, portfolio } from "./fixtures.ts";
import readme from "./SiteFooter.md?raw";
import { SiteFooter } from "./SiteFooter.tsx";

const meta = {
  title: "Site/SiteFooter",
  component: SiteFooter,
  parameters: { docs: { description: { component: readme } }, card: { frame: "page" } },
  args: blogFooter,
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Blog: Story = {};
// The portfolio's, on an English page: the person's name and line, and the language.
export const Portfolio: Story = { args: portfolio.en.footer() };
