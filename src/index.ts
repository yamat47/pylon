// The design system's surface. A component is part of it when it is exported here and has a
// guideline (`<Name>.md`) and stories (`<Name>.stories.tsx`) beside it; a test checks that
// (index.test.ts). Importing this file brings both stylesheets, so one import gives a page the look.
import "./tokens.css";
import "./components.css";

export { Page } from "./Page.tsx";
export { PostIndex } from "./PostIndex.tsx";
export type { IndexedPost } from "./post-index.ts";
export { SiteFooter } from "./SiteFooter.tsx";
export { SiteHeader } from "./SiteHeader.tsx";
export type { LinkItem } from "./types.ts";
