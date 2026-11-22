// A link as a component takes it: what it says and where it goes.
export type LinkItem = {
  readonly label: string;
  readonly href: string;
  // True on the link to the page the reader is on, or to the language they read in.
  readonly current?: boolean | undefined;
  // The language of the label and of the page it goes to, where it is not the page's own: the
  // link to the same page in the other language (`ja` on an English page).
  readonly lang?: string | undefined;
};

// Links under a name, such as a group in the footer.
export type LinkGroup = {
  readonly label: string;
  readonly links: readonly LinkItem[];
};

// A picture: its address, and what it shows, said to a reader who cannot see it.
export type Image = {
  readonly src: string;
  readonly alt: string;
};

// What a site's own tools read off an element, such as the mark that keeps it out of a search
// index: `data-*` attributes, the only kind a site adds to what a component writes.
export type DataAttributes = {
  readonly [name: `data-${string}`]: string | undefined;
};

// One row of an IndexList: a short figure, then a title that links somewhere.
export type IndexItem = {
  readonly title: string;
  readonly href: string;
  // What stands before the title, such as a day (02.13).
  readonly figure: string;
  // The date the figure stands for, as YYYY-MM-DD, when it is one.
  readonly dateTime?: string | undefined;
};

// The rows that share a label, such as the posts of a year.
export type IndexGroup = {
  readonly label: string;
  readonly items: readonly IndexItem[];
};

// The portfolio's two languages: English at `/`, Japanese at `/ja/`.
export type Language = "en" | "ja";

// Something the person made or took part in, as a ProjectGrid shows it.
export type Project = {
  readonly name: string;
  // When it began, and when it ended where it has: YYYY or YYYY-MM.
  readonly start: string;
  readonly end?: string | undefined;
  // One or two sentences: what it is, and what came of it.
  readonly description: string;
  // Where it is: its code, its package, a demo.
  readonly links: readonly LinkItem[];
  // A 16:10 screenshot of it.
  readonly screenshot?: Image | undefined;
};

// A talk the person gave.
export type Talk = {
  readonly title: string;
  // The title's language, where it is not the page's.
  readonly lang?: string | undefined;
  // The day it was given, as YYYY-MM-DD.
  readonly date: string;
  // Where it was given, with the name's language where it is not the page's.
  readonly event?: { readonly name: string; readonly lang?: string | undefined } | undefined;
  // Its slides, a video, the event's page.
  readonly links: readonly LinkItem[];
};

// A role the person held at a company.
export type Role = {
  readonly title: string;
  // When it began, and when it ended where it has: YYYY-MM.
  readonly start: string;
  readonly end?: string | undefined;
  // What the person did in it, in a few sentences.
  readonly text?: string | undefined;
};

// A company the person worked at, with the roles they held there, the latest first.
export type Company = {
  readonly name: string;
  readonly roles: readonly [Role, ...Role[]];
};
