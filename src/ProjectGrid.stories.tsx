import type { Meta, StoryObj } from "@storybook/react-vite";
import { picture, portfolio } from "./fixtures.ts";
import readme from "./ProjectGrid.md?raw";
import { ProjectGrid } from "./ProjectGrid.tsx";

const { en, ja } = portfolio;

const meta = {
  title: "Lists/ProjectGrid",
  component: ProjectGrid,
  parameters: { docs: { description: { component: readme } }, card: { frame: "text" } },
  args: { projects: en.projects },
} satisfies Meta<typeof ProjectGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// The projects page, before the screenshots are there.
export const English: Story = {};
export const Japanese: Story = { args: { projects: ja.projects.slice(0, 4), titleAs: "h3" } };
export const WithScreenshots: Story = {
  args: {
    projects: en.projects.slice(0, 2).map((project) => ({
      ...project,
      screenshot: { src: picture, alt: `Screenshot of ${project.name}` },
    })),
  },
};
