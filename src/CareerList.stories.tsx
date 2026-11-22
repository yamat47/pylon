import type { Meta, StoryObj } from "@storybook/react-vite";
import readme from "./CareerList.md?raw";
import { CareerList } from "./CareerList.tsx";
import { portfolio } from "./fixtures.ts";

const { en, ja } = portfolio;

const meta = {
  title: "Lists/CareerList",
  component: CareerList,
  parameters: { docs: { description: { component: readme } }, card: { frame: "text" } },
  args: { companies: ja.companies },
} satisfies Meta<typeof CareerList>;

export default meta;
type Story = StoryObj<typeof meta>;

// The career page.
export const Japanese: Story = {};
export const English: Story = { args: { companies: en.companies } };
// The top page's few lines.
export const Brief: Story = { args: { brief: true } };
