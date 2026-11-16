// A link as a component takes it: what it says and where it goes.
export type LinkItem = {
  readonly label: string;
  readonly href: string;
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
