import type { Meta, StoryObj } from "@storybook/react-vite";
import { picture } from "./fixtures.ts";
import readme from "./Picture.md?raw";
import { Picture } from "./Picture.tsx";

const meta = {
  title: "Text/Picture",
  component: Picture,
  parameters: { docs: { description: { component: readme } }, card: { frame: "text" } },
  args: { ratio: "3:2", image: { src: picture, alt: "グラウンドでの練習" } },
} satisfies Meta<typeof Picture>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Photograph: Story = {};
export const Screenshot: Story = { args: { ratio: "16:10" } };
// What a place looks like before its picture is there, and when the picture fails to load.
export const NotThereYet: Story = { args: { image: undefined } };
export const FailedToLoad: Story = {
  args: { image: { src: "/missing.png", alt: "読み込めなかった写真" } },
};
