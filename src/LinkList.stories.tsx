import type { Meta, StoryObj } from "@storybook/react-vite";
import { footerLinks, nav, portfolio } from "./fixtures.ts";
import readme from "./LinkList.md?raw";
import { LinkList } from "./LinkList.tsx";

const meta = {
  title: "Lists/LinkList",
  component: LinkList,
  parameters: { docs: { description: { component: readme } }, card: { frame: "wide" } },
  args: { links: footerLinks },
} satisfies Meta<typeof LinkList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneLink: Story = {};
export const SeveralLinks: Story = { args: { links: [...nav, ...footerLinks] } };
// The pages of the portfolio in its profile column, on the projects page.
export const Stacked: Story = { args: { links: portfolio.ja.pages("projects"), stacked: true } };
