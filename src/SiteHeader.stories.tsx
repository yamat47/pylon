import type { Meta, StoryObj } from "@storybook/react-vite";
import { nav, site } from "./fixtures.ts";
import readme from "./SiteHeader.md?raw";
import { SiteHeader } from "./SiteHeader.tsx";

const meta = {
  title: "Site/SiteHeader",
  component: SiteHeader,
  parameters: { docs: { description: { component: readme } } },
  args: { ...site, nav },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
// On the top page the name is the page's h1. It looks the same.
export const OnTheTopPage: Story = { args: { heading: true } };
export const NameOnly: Story = { args: { description: undefined, nav: [] } };
