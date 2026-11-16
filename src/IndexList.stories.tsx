import type { Meta, StoryObj } from "@storybook/react-vite";
import { posts } from "./fixtures.ts";
import readme from "./IndexList.md?raw";
import { IndexList } from "./IndexList.tsx";
import { byYear } from "./post-index.ts";

const groups = byYear(posts);

const meta = {
  title: "Lists/IndexList",
  component: IndexList,
  parameters: { docs: { description: { component: readme } } },
  args: { groups },
} satisfies Meta<typeof IndexList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SeveralGroups: Story = {};
export const OneGroup: Story = { args: { groups: groups.slice(1, 2) } };
// A figure that is not a date is a plain mark before the title.
export const FiguresThatAreNotDates: Story = {
  args: {
    groups: groups.slice(1, 2).map((group) => ({
      label: group.label,
      items: group.items.map((item, at) => ({
        title: item.title,
        href: item.href,
        figure: String(group.items.length - at).padStart(2, "0"),
      })),
    })),
  },
};
