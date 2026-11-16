import type { Meta, StoryObj } from "@storybook/react-vite";
import { posts } from "./fixtures.ts";
import readme from "./PostIndex.md?raw";
import { PostIndex } from "./PostIndex.tsx";

const meta = {
  title: "Posts/PostIndex",
  component: PostIndex,
  parameters: { docs: { description: { component: readme } } },
  args: { posts },
} satisfies Meta<typeof PostIndex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const OneYear: Story = {
  args: { posts: posts.filter((post) => post.date.startsWith("2025")) },
};
