import type { Decorator, Preview } from "@storybook/react-vite";
import { type ReactNode, useEffect } from "react";
import "../src/tokens.css";
import "../src/components.css";
import { THEMES, type Theme } from "../scripts/tokens-css.ts";

// The sites are in Japanese, and the browser breaks lines by the page's language.
document.documentElement.lang = "ja";

const isTheme = (value: unknown): value is Theme => THEMES.some((theme) => theme === value);

// The toolbar's theme goes on <html data-theme>, the attribute tokens.css reads. A site sets
// nothing there and follows the reader's system instead.
function Themed({ theme, children }: { theme: Theme; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return children;
}

const themed: Decorator = (Story, context) => (
  <Themed theme={isTheme(context.globals.theme) ? context.globals.theme : "light"}>
    <Story />
  </Themed>
);

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Light or dark, as the reader's system would choose",
      toolbar: { icon: "mirror", items: [...THEMES], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [themed],
  // Every component gets a page with its guideline and its stories.
  tags: ["autodocs"],
  parameters: {
    // A component fills the width it is given, as it does on a page.
    layout: "fullscreen",
    // The page's color comes from the tokens, with the theme.
    backgrounds: { disable: true },
    options: { storySort: { order: ["Pages", "Site", "Posts", "Lists", "Text"] } },
  },
};

export default preview;
