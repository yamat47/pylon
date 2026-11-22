// The design system's surface. A component is part of it when it is exported here and has a
// guideline (`<Name>.md`) and stories (`<Name>.stories.tsx`) beside it; a test checks that
// (index.test.ts). The look itself is the stylesheet, which a site loads beside this
// (`@yamat47/pylon/styles.css`): what is published is plain JavaScript that imports no CSS, so that
// anything able to run JavaScript can render the components.

export { AboutSection } from "./AboutSection.tsx";
export { CareerList } from "./CareerList.tsx";
export { fullDate } from "./dates.ts";
export { IndexList } from "./IndexList.tsx";
export { Introduction } from "./Introduction.tsx";
export { LinkCard } from "./LinkCard.tsx";
export { LinkList } from "./LinkList.tsx";
export { Page } from "./Page.tsx";
export { PageHeader } from "./PageHeader.tsx";
export { Picture, type PictureRatio } from "./Picture.tsx";
export { PostIndex } from "./PostIndex.tsx";
export { ProfileAside } from "./ProfileAside.tsx";
export { ProfilePage } from "./ProfilePage.tsx";
export { ProjectGrid } from "./ProjectGrid.tsx";
export { Prose } from "./Prose.tsx";
export type { IndexedPost } from "./post-index.ts";
export { SearchField } from "./SearchField.tsx";
export { SearchResults } from "./SearchResults.tsx";
export { Section } from "./Section.tsx";
export { SiteFooter } from "./SiteFooter.tsx";
export { SiteHeader } from "./SiteHeader.tsx";
export { TalkFeature } from "./TalkFeature.tsx";
export { TalkList } from "./TalkList.tsx";
export { Text } from "./Text.tsx";
export type { TextVariant } from "./text-variants.ts";
export type {
  Company,
  DataAttributes,
  Image,
  IndexGroup,
  IndexItem,
  Language,
  LinkGroup,
  LinkItem,
  Project,
  Role,
  Talk,
} from "./types.ts";
export { WritingList } from "./WritingList.tsx";
export type { Article } from "./writing-list.ts";
