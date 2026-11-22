// Generated from src/ by scripts/project.ts: the declarations of every file the package is
// built from, in one. window.Pylon holds what the last block lists.
import type { ReactNode } from "react";

// career-list
declare function tenure(company: Company): string;
declare const goesOn: (role: Role) => boolean;

// data-attributes
declare function dataAttributes(given: object | undefined): DataAttributes;

// dates
export declare const fullDate: (date: string) => string;
declare const monthDay: (date: string) => string;
declare function period(start: string, end?: string | undefined): string;

// post-index
export type IndexedPost = {
    readonly title: string;
    readonly href: string;
    readonly date: string;
};
declare function byYear(posts: readonly IndexedPost[]): IndexGroup[];

// text-variants
declare const TEXT_VARIANTS: readonly ["title", "heading", "subheading", "minor-heading", "entry", "lead", "lead-latin", "body", "body-latin", "small", "caption", "label", "figure", "site"];
export type TextVariant = (typeof TEXT_VARIANTS)[number];

// types
export type LinkItem = {
    readonly label: string;
    readonly href: string;
    readonly current?: boolean | undefined;
    readonly lang?: string | undefined;
};
export type LinkGroup = {
    readonly label: string;
    readonly links: readonly LinkItem[];
};
export type Image = {
    readonly src: string;
    readonly alt: string;
};
export type DataAttributes = {
    readonly [name: `data-${string}`]: string | undefined;
};
export type IndexItem = {
    readonly title: string;
    readonly href: string;
    readonly figure: string;
    readonly dateTime?: string | undefined;
};
export type IndexGroup = {
    readonly label: string;
    readonly items: readonly IndexItem[];
};
export type Language = "en" | "ja";
export type Project = {
    readonly name: string;
    readonly start: string;
    readonly end?: string | undefined;
    readonly description: string;
    readonly links: readonly LinkItem[];
    readonly screenshot?: Image | undefined;
};
export type Talk = {
    readonly title: string;
    readonly lang?: string | undefined;
    readonly date: string;
    readonly event?: {
        readonly name: string;
        readonly lang?: string | undefined;
    } | undefined;
    readonly links: readonly LinkItem[];
};
export type Role = {
    readonly title: string;
    readonly start: string;
    readonly end?: string | undefined;
    readonly text?: string | undefined;
};
export type Company = {
    readonly name: string;
    readonly roles: readonly [Role, ...Role[]];
};

// writing-list
export type Article = IndexedPost & {
    readonly lang?: string | undefined;
};
declare function articlesByYear(articles: readonly Article[]): {
    year: string;
    articles: readonly Article[];
}[];

// AboutSection
type AboutSectionProps = {
    title: string;
    children: ReactNode;
    photos?: readonly Image[] | undefined;
    links?: readonly LinkItem[] | undefined;
};
export declare function AboutSection({ title, children, photos, links }: AboutSectionProps): import("react").JSX.Element;

// CareerList
type CareerListProps = {
    companies: readonly Company[];
    brief?: boolean | undefined;
};
export declare function CareerList({ companies, brief }: CareerListProps): import("react").JSX.Element;

// IndexList
type IndexListProps = {
    groups: readonly IndexGroup[];
};
export declare function IndexList({ groups }: IndexListProps): import("react").JSX.Element;

// Introduction
type IntroductionProps = {
    lang: Language;
    children: ReactNode;
    more?: LinkItem | undefined;
};
export declare function Introduction({ lang, children, more }: IntroductionProps): import("react").JSX.Element;

// LinkCard
type LinkCardProps = {
    href: string;
    title: string;
    description?: string | undefined;
    site: string;
    date?: string | undefined;
    image?: string | undefined;
    linkAttributes?: DataAttributes | undefined;
};
export declare function LinkCard({ href, title, description, site, date, image, linkAttributes, }: LinkCardProps): import("react").JSX.Element;

// LinkList
type LinkListProps = {
    links: readonly LinkItem[];
    stacked?: boolean | undefined;
};
export declare function LinkList({ links, stacked }: LinkListProps): import("react").JSX.Element;

// Page
type PageProps = {
    header: ReactNode;
    footer: ReactNode;
    width: "wide" | "text";
    children: ReactNode;
};
export declare function Page({ header, footer, width, children }: PageProps): import("react").JSX.Element;

// PageHeader
type PageHeaderProps = {
    title: string;
    date?: string | undefined;
    dateAttributes?: DataAttributes | undefined;
    count?: number | undefined;
};
export declare function PageHeader({ title, date, dateAttributes, count }: PageHeaderProps): import("react").JSX.Element;

// Picture
export type PictureRatio = "1:1" | "3:2" | "4:3" | "16:9" | "16:10";
type PictureProps = {
    image?: Image | undefined;
    ratio: PictureRatio;
};
export declare function Picture({ image, ratio }: PictureProps): import("react").JSX.Element;

// PostIndex
type PostIndexProps = {
    posts: readonly IndexedPost[];
};
export declare function PostIndex({ posts }: PostIndexProps): import("react").JSX.Element;

// ProfileAside
type ProfileAsideProps = {
    name: string;
    href: string;
    description?: string | undefined;
    photo?: Image | undefined;
    heading?: boolean | undefined;
    pages: readonly LinkItem[];
    links?: readonly LinkItem[] | undefined;
    language?: LinkItem | undefined;
};
export declare function ProfileAside({ name, href, description, photo, heading, pages, links, language, }: ProfileAsideProps): import("react").JSX.Element;

// ProfilePage
type ProfilePageProps = {
    lang: Language;
    aside: ReactNode;
    footer: ReactNode;
    children: ReactNode;
};
export declare function ProfilePage({ lang, aside, footer, children }: ProfilePageProps): import("react").JSX.Element;

// ProjectGrid
type ProjectGridProps = {
    projects: readonly Project[];
    titleAs?: "h2" | "h3" | undefined;
};
export declare function ProjectGrid({ projects, titleAs }: ProjectGridProps): import("react").JSX.Element;

// Prose
type ProseProps = {
    children: ReactNode;
};
export declare function Prose({ children }: ProseProps): import("react").JSX.Element;

// SearchField
type SearchFieldProps = {
    id: string;
    name: string;
    label: string;
    placeholder: string;
};
export declare function SearchField({ id, name, label, placeholder }: SearchFieldProps): import("react").JSX.Element;

// SearchResults
type SearchResultsProps = {
    statusId: string;
    listId: string;
    status?: string | undefined;
    withoutScript?: string | undefined;
    children?: ReactNode;
};
export declare function SearchResults({ statusId, listId, status, withoutScript, children, }: SearchResultsProps): import("react").JSX.Element;

// Section
type SectionProps = {
    title: string;
    more?: LinkItem | undefined;
    children: ReactNode;
};
export declare function Section({ title, more, children }: SectionProps): import("react").JSX.Element;

// SiteFooter
type SiteFooterProps = {
    name: string;
    href: string;
    description?: string | undefined;
    groups: readonly LinkGroup[];
    copyright: {
        readonly year: number;
        readonly holder: string;
    };
};
export declare function SiteFooter({ name, href, description, groups, copyright }: SiteFooterProps): import("react").JSX.Element;

// SiteHeader
type SiteHeaderProps = {
    name: string;
    href: string;
    description?: string | undefined;
    heading?: boolean | undefined;
    nav?: readonly LinkItem[] | undefined;
};
export declare function SiteHeader({ name, href, description, heading, nav, }: SiteHeaderProps): import("react").JSX.Element;

// TalkFeature
type TalkFeatureProps = {
    talk: Talk;
    slide?: Image | undefined;
    titleAs?: "h2" | "h3" | undefined;
};
export declare function TalkFeature({ talk, slide, titleAs: Title }: TalkFeatureProps): import("react").JSX.Element;

// TalkList
type TalkListProps = {
    talks: readonly Talk[];
    titleAs?: "h2" | "h3" | undefined;
};
export declare function TalkList({ talks, titleAs: Title }: TalkListProps): import("react").JSX.Element;

// Text
type TextProps = {
    variant?: TextVariant | undefined;
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | undefined;
    tone?: "ink" | "muted" | undefined;
    children: ReactNode;
};
export declare function Text({ variant, as: Tag, tone, children }: TextProps): import("react").JSX.Element;

// WritingList
type WritingListProps = {
    articles: readonly Article[];
    grouped?: boolean | undefined;
};
export declare function WritingList({ articles, grouped }: WritingListProps): import("react").JSX.Element;

declare global {
  interface Window {
    Pylon: {
      AboutSection: typeof AboutSection;
      CareerList: typeof CareerList;
      IndexList: typeof IndexList;
      Introduction: typeof Introduction;
      LinkCard: typeof LinkCard;
      LinkList: typeof LinkList;
      Page: typeof Page;
      PageHeader: typeof PageHeader;
      Picture: typeof Picture;
      PostIndex: typeof PostIndex;
      ProfileAside: typeof ProfileAside;
      ProfilePage: typeof ProfilePage;
      ProjectGrid: typeof ProjectGrid;
      Prose: typeof Prose;
      SearchField: typeof SearchField;
      SearchResults: typeof SearchResults;
      Section: typeof Section;
      SiteFooter: typeof SiteFooter;
      SiteHeader: typeof SiteHeader;
      TalkFeature: typeof TalkFeature;
      TalkList: typeof TalkList;
      Text: typeof Text;
      WritingList: typeof WritingList;
      fullDate: typeof fullDate;
    };
  }
}
