import type { Meta, StoryObj } from "@storybook/react-vite";
import { portfolio } from "./fixtures.ts";
import readme from "./WritingList.md?raw";
import { WritingList } from "./WritingList.tsx";

const { ja } = portfolio;

const meta = {
  title: "Lists/WritingList",
  component: WritingList,
  parameters: { docs: { description: { component: readme } }, card: { frame: "text" } },
  args: { articles: ja.articles },
} satisfies Meta<typeof WritingList>;

export default meta;
type Story = StoryObj<typeof meta>;

// The page of writing.
export const Grouped: Story = { args: { grouped: true } };
// A few on the top page, in a Section.
export const Few: Story = { args: { articles: ja.articles.slice(0, 4) } };
