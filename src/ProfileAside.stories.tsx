import type { Meta, StoryObj } from "@storybook/react-vite";
import { picture, portfolio } from "./fixtures.ts";
import readme from "./ProfileAside.md?raw";
import { ProfileAside } from "./ProfileAside.tsx";

const { en, ja } = portfolio;

const meta = {
  title: "Site/ProfileAside",
  component: ProfileAside,
  parameters: { docs: { description: { component: readme } }, card: { frame: "text" } },
  args: { ...en.profile, pages: en.pages("projects") },
} satisfies Meta<typeof ProfileAside>;

export default meta;
type Story = StoryObj<typeof meta>;

// On the projects page, in English.
export const English: Story = {};
// On the top page, where the name is the page's h1 and no page is marked.
export const TopPage: Story = { args: { heading: true, pages: en.pages() } };
export const Japanese: Story = { args: { ...ja.profile, pages: ja.pages("projects") } };
export const WithPhoto: Story = {
  args: { photo: { src: picture, alt: "Photo of Takuya Yamaguchi" } },
};
