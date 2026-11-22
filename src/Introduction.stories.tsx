import type { Meta, StoryObj } from "@storybook/react-vite";
import { portfolio } from "./fixtures.ts";
import readme from "./Introduction.md?raw";
import { Introduction } from "./Introduction.tsx";

const { en, ja } = portfolio;

const meta = {
  title: "Text/Introduction",
  component: Introduction,
  parameters: { docs: { description: { component: readme } }, card: { frame: "text" } },
  args: { lang: "ja", children: ja.top.introduction, more: ja.top.more },
} satisfies Meta<typeof Introduction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Japanese: Story = {};
export const English: Story = {
  args: { lang: "en", children: en.top.introduction, more: en.top.more },
};
// On the about page, where the introduction leads to nothing else.
export const WithoutMore: Story = {
  args: { lang: "en", children: en.about.introduction, more: undefined },
};
