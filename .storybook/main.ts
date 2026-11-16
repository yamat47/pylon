import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.tsx"],
  addons: ["@storybook/addon-docs"],
  // The Vite configuration sits beside Storybook because nothing else here is built with Vite.
  framework: {
    name: "@storybook/react-vite",
    options: { builder: { viteConfigPath: ".storybook/vite.config.ts" } },
  },
  // The container binds 0.0.0.0; only the host's browser may reach it.
  core: { disableTelemetry: true, allowedHosts: ["localhost", "127.0.0.1"] },
};

export default config;
