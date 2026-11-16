import type { Meta, StoryObj } from "@storybook/react-vite";
import { search } from "./fixtures.ts";
import readme from "./SearchField.md?raw";
import { SearchField } from "./SearchField.tsx";

const meta = {
  title: "Search/SearchField",
  component: SearchField,
  parameters: { docs: { description: { component: readme } }, card: { frame: "text" } },
  args: search.field,
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
