import type { Meta, StoryObj } from "@storybook/react-vite";
import { otherBlocks, postBody } from "./fixture-texts.tsx";
import readme from "./Prose.md?raw";
import { Prose } from "./Prose.tsx";

const meta = {
  title: "Text/Prose",
  component: Prose,
  parameters: { docs: { description: { component: readme } } },
} satisfies Meta<typeof Prose>;

export default meta;
type Story = StoryObj<typeof meta>;

// The body of one post: paragraphs, headings, lists, links and a link card.
export const Post: Story = { args: { children: postBody } };
// The blocks that post does not have: the lower headings, a numbered and a nested list, a quote
// of two paragraphs, code, an image alone and one with its caption, and a frame from another site,
// around whose rounded corners the dark page has to show.
export const OtherBlocks: Story = { args: { children: otherBlocks } };
