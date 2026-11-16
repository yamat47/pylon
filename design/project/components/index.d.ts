// Generated from src/ by scripts/project.ts: the declarations of every file the package is
// built from, in one. window.Pylon holds what the last block lists.
import type { ReactNode } from "react";

// data-attributes
declare function dataAttributes(given: object | undefined): DataAttributes;

// dates
export declare const fullDate: (date: string) => string;
declare const monthDay: (date: string) => string;

// post-index
export type IndexedPost = {
    readonly title: string;
    readonly href: string;
    readonly date: string;
};
declare function byYear(posts: readonly IndexedPost[]): IndexGroup[];

// text-variants
declare const TEXT_VARIANTS: readonly ["title", "heading", "subheading", "minor-heading", "entry", "body", "small", "caption", "label", "figure", "site"];
export type TextVariant = (typeof TEXT_VARIANTS)[number];

// types
export type LinkItem = {
    readonly label: string;
    readonly href: string;
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

// IndexList
type IndexListProps = {
    groups: readonly IndexGroup[];
};
export declare function IndexList({ groups }: IndexListProps): import("react").JSX.Element;

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
};
export declare function LinkList({ links }: LinkListProps): import("react").JSX.Element;

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
};
export declare function PageHeader({ title, date, dateAttributes }: PageHeaderProps): import("react").JSX.Element;

// PostIndex
type PostIndexProps = {
    posts: readonly IndexedPost[];
};
export declare function PostIndex({ posts }: PostIndexProps): import("react").JSX.Element;

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

// SiteFooter
type SiteFooterProps = {
    links: readonly LinkItem[];
};
export declare function SiteFooter({ links }: SiteFooterProps): import("react").JSX.Element;

// SiteHeader
type SiteHeaderProps = {
    name: string;
    href: string;
    description?: string | undefined;
    heading?: boolean | undefined;
    nav?: readonly LinkItem[] | undefined;
};
export declare function SiteHeader({ name, href, description, heading, nav, }: SiteHeaderProps): import("react").JSX.Element;

// Text
type TextProps = {
    variant?: TextVariant | undefined;
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | undefined;
    tone?: "ink" | "muted" | undefined;
    children: ReactNode;
};
export declare function Text({ variant, as: Tag, tone, children }: TextProps): import("react").JSX.Element;

declare global {
  interface Window {
    Pylon: {
      IndexList: typeof IndexList;
      LinkCard: typeof LinkCard;
      LinkList: typeof LinkList;
      Page: typeof Page;
      PageHeader: typeof PageHeader;
      PostIndex: typeof PostIndex;
      Prose: typeof Prose;
      SearchField: typeof SearchField;
      SearchResults: typeof SearchResults;
      SiteFooter: typeof SiteFooter;
      SiteHeader: typeof SiteHeader;
      Text: typeof Text;
      fullDate: typeof fullDate;
    };
  }
}
