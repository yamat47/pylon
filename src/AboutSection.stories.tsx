import type { Meta, StoryObj } from "@storybook/react-vite";
import readme from "./AboutSection.md?raw";
import { AboutSection } from "./AboutSection.tsx";
import { photo, picture, portfolio } from "./fixtures.ts";

const [work, , football] = portfolio.en.about.sections;

const meta = {
  title: "Text/AboutSection",
  component: AboutSection,
  parameters: { docs: { description: { component: readme } }, card: { frame: "text" } },
  args: { title: work.title, links: work.links, children: <p>{work.text}</p> },
} satisfies Meta<typeof AboutSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithPhotos: Story = {
  args: {
    title: football.title,
    links: football.links,
    children: <p>{football.text}</p>,
    photos: [
      { src: picture, alt: "A practice on the field" },
      { src: photo, alt: "The team on the sideline" },
    ],
  },
};
