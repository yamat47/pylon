import type { Meta, StoryObj } from "@storybook/react-vite";
import { footerLinks } from "./fixtures.ts";
import readme from "./SiteFooter.md?raw";
import { SiteFooter } from "./SiteFooter.tsx";

const meta = {
  title: "Site/SiteFooter",
  component: SiteFooter,
  parameters: { docs: { description: { component: readme } }, card: { frame: "wide" } },
  args: { links: footerLinks },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
