import type { Meta, StoryObj } from "@storybook/react-vite";
import { footerLinks, nav } from "./fixtures.ts";
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
