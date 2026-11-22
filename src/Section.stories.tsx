import type { Meta, StoryObj } from "@storybook/react-vite";
import { portfolio } from "./fixtures.ts";
import { Prose } from "./Prose.tsx";
import readme from "./Section.md?raw";
import { Section } from "./Section.tsx";
import { WritingList } from "./WritingList.tsx";

const { ja } = portfolio;

const meta = {
  title: "Text/Section",
  component: Section,
  parameters: { docs: { description: { component: readme } }, card: { frame: "text" } },
  args: {
    title: ja.top.writing.title,
    more: ja.top.writing.more,
    children: <WritingList articles={ja.articles.slice(0, 3)} />,
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithMore: Story = {};
// A section that is the whole of what it shows, such as how to get in touch.
export const WithoutMore: Story = {
  args: {
    title: ja.top.contact.title,
    more: undefined,
    children: (
      <Prose>
        <p>{ja.top.contact.text}</p>
      </Prose>
    ),
  },
};
