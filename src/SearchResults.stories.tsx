import type { Meta, StoryObj } from "@storybook/react-vite";
import { foundItems } from "./fixture-texts.tsx";
import { search } from "./fixtures.ts";
import readme from "./SearchResults.md?raw";
import { SearchResults } from "./SearchResults.tsx";

const meta = {
  title: "Search/SearchResults",
  component: SearchResults,
  parameters: { docs: { description: { component: readme } } },
  args: search.results,
} satisfies Meta<typeof SearchResults>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Found: Story = { args: { status: search.status, children: foundItems } };
export const NothingFound: Story = { args: { status: search.nothing } };
// Before a search: the line is empty and the list takes no room.
export const BeforeASearch: Story = {};
