import type { Meta, StoryObj } from "@storybook/react-vite";
import { posts } from "./fixtures.ts";
import readme from "./PostIndex.md?raw";
import { PostIndex } from "./PostIndex.tsx";

const meta = {
  title: "Posts/PostIndex",
  component: PostIndex,
  parameters: { docs: { description: { component: readme } }, card: { frame: "wide" } },
  args: { posts },
} satisfies Meta<typeof PostIndex>;

export default meta;
type Story = StoryObj<typeof meta>;

// What an IndexList looks like with fewer groups or other figures is in its own stories.
export const Default: Story = {};
