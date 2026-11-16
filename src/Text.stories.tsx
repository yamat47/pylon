import type { Meta, StoryObj } from "@storybook/react-vite";
import tokens from "../system/tokens.json" with { type: "json" };
import readme from "./Text.md?raw";
import { Text } from "./Text.tsx";
import type { TextVariant } from "./text-variants.ts";

// The sample the tokens give for a text style.
function sample(variant: TextVariant): string {
  const styles = tokens.type.groups.flatMap((group) => group.styles);
  const style = styles.find((candidate) => candidate.name === `text-${variant}`);
  if (!style) throw new Error(`no text style named text-${variant}`);
  return style.sample;
}

const meta = {
  title: "Text/Text",
  component: Text,
  parameters: { docs: { description: { component: readme } }, card: { frame: "text" } },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// One story per text style, each showing the sample the tokens give for it.
export const Title: Story = { args: { variant: "title", as: "h1", children: sample("title") } };
export const Heading: Story = {
  args: { variant: "heading", as: "h2", children: sample("heading") },
};
export const Subheading: Story = {
  args: { variant: "subheading", as: "h3", children: sample("subheading") },
};
export const MinorHeading: Story = {
  args: { variant: "minor-heading", as: "h4", children: sample("minor-heading") },
};
export const Entry: Story = { args: { variant: "entry", children: sample("entry") } };
export const Body: Story = { args: { variant: "body", children: sample("body") } };
export const Small: Story = { args: { variant: "small", children: sample("small") } };
export const Caption: Story = {
  args: { variant: "caption", tone: "muted", children: sample("caption") },
};
export const Label: Story = {
  args: { variant: "label", tone: "muted", children: sample("label") },
};
export const Figure: Story = {
  args: { variant: "figure", tone: "muted", children: sample("figure") },
};
export const Site: Story = { args: { variant: "site", children: sample("site") } };
