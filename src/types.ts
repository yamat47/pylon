// A link as a component takes it: what it says and where it goes.
export type LinkItem = {
  readonly label: string;
  readonly href: string;
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
