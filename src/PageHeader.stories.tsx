import type { Meta, StoryObj } from "@storybook/react-vite";
import { portfolio, privacy, splittingStories } from "./fixtures.ts";
import readme from "./PageHeader.md?raw";
import { PageHeader } from "./PageHeader.tsx";

const meta = {
  title: "Pages/PageHeader",
  component: PageHeader,
  parameters: { docs: { description: { component: readme } }, card: { frame: "text" } },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OfAPost: Story = {
  args: { title: splittingStories.title, date: splittingStories.date },
};
export const WithoutADate: Story = { args: { title: privacy.title } };
// A page of the portfolio that is a list.
export const OfAList: Story = {
  args: { title: portfolio.ja.titles.projects, count: portfolio.ja.projects.length },
};
