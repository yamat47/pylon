import type { Meta, StoryObj } from "@storybook/react-vite";
import { privacy, splittingStories } from "./fixtures.ts";
import readme from "./PageHeader.md?raw";
import { PageHeader } from "./PageHeader.tsx";

const meta = {
  title: "Pages/PageHeader",
  component: PageHeader,
  parameters: { docs: { description: { component: readme } } },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OfAPost: Story = {
  args: { title: splittingStories.title, date: splittingStories.date },
};
export const WithoutADate: Story = { args: { title: privacy.title } };
