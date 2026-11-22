import type { Meta, StoryObj } from "@storybook/react-vite";
import { portfolio } from "./fixtures.ts";
import readme from "./TalkList.md?raw";
import { TalkList } from "./TalkList.tsx";

const { en, ja } = portfolio;

const meta = {
  title: "Lists/TalkList",
  component: TalkList,
  parameters: { docs: { description: { component: readme } }, card: { frame: "text" } },
  args: { talks: ja.talks.slice(1) },
} satisfies Meta<typeof TalkList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Japanese: Story = {};
// Talks given in Japanese, listed on an English page: the titles are translated, the events keep
// their own names.
export const English: Story = { args: { talks: en.talks.slice(1) } };
