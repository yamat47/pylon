// The design system's surface. A component is part of it when it is exported here and has a
// guideline (`<Name>.md`) and stories (`<Name>.stories.tsx`) beside it; a test checks that
// (index.test.ts). The look itself is the stylesheet, which a site loads beside this
// (`@yamat47/pylon/styles.css`): what is published is plain JavaScript that imports no CSS, so that
// anything able to run JavaScript can render the components.

export { IndexList } from "./IndexList.tsx";
export { LinkCard } from "./LinkCard.tsx";
export { LinkList } from "./LinkList.tsx";
export { Page } from "./Page.tsx";
export { PageHeader } from "./PageHeader.tsx";
export { PostIndex } from "./PostIndex.tsx";
export { Prose } from "./Prose.tsx";
export type { IndexedPost } from "./post-index.ts";
export { SearchField } from "./SearchField.tsx";
export { SearchResults } from "./SearchResults.tsx";
export { SiteFooter } from "./SiteFooter.tsx";
export { SiteHeader } from "./SiteHeader.tsx";
export { Text } from "./Text.tsx";
export type { TextVariant } from "./text-variants.ts";
export type { IndexGroup, IndexItem, LinkItem } from "./types.ts";
