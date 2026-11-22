import type { Meta, StoryObj } from "@storybook/react-vite";
import { picture, portfolio } from "./fixtures.ts";
import readme from "./TalkFeature.md?raw";
import { TalkFeature } from "./TalkFeature.tsx";

const { en, ja } = portfolio;

const meta = {
  title: "Lists/TalkFeature",
  component: TalkFeature,
  parameters: { docs: { description: { component: readme } }, card: { frame: "text" } },
  args: { talk: ja.talks[0] },
} satisfies Meta<typeof TalkFeature>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Japanese: Story = {};
export const English: Story = { args: { talk: en.talks[0] } };
export const WithSlide: Story = {
  args: { slide: { src: picture, alt: "スライドの1枚目" } },
};
