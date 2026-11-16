// The design system's surface. A component is part of it when it is exported here and has a
// guideline (`<Name>.md`) and stories (`<Name>.stories.tsx`) beside it; a test checks that
// (index.test.ts). Importing this file brings the fonts and both stylesheets, so one import gives a
// page the look.
import "./fonts.css";
import "./tokens.css";
import "./components.css";

export { IndexList } from "./IndexList.tsx";
export { LinkCard } from "./LinkCard.tsx";
export { LinkList } from "./LinkList.tsx";
export { Page } from "./Page.tsx";
export { PageHeader } from "./PageHeader.tsx";
export { PostIndex } from "./PostIndex.tsx";
export { Prose } from "./Prose.tsx";
export type { IndexedPost } from "./post-index.ts";
export { SiteFooter } from "./SiteFooter.tsx";
export { SiteHeader } from "./SiteHeader.tsx";
export { Text } from "./Text.tsx";
export type { TextVariant } from "./text-variants.ts";
export type { IndexGroup, IndexItem, LinkItem } from "./types.ts";
