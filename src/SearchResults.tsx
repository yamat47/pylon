import type { ReactNode } from "react";

type SearchResultsProps = {
  // The ids of the line that says how the search went and of the list of what it found, by which
  // the site's script finds them.
  statusId: string;
  listId: string;
  // What the line says before a script has run.
  status?: string | undefined;
  // What a reader whose browser runs no script is told, where the search needs one.
  withoutScript?: string | undefined;
  // Items already known when the page is built (see the guideline for what an item is). A search
  // that runs in the reader's browser leaves this out and fills the list itself.
  children?: ReactNode;
};

export function SearchResults({
  statusId,
  listId,
  status,
  withoutScript,
  children,
}: SearchResultsProps) {
  return (
    <div className="py-search-results">
      {withoutScript === undefined ? null : (
        <noscript>
          <p className="py-text py-muted text-small">{withoutScript}</p>
        </noscript>
      )}
      <p className="py-text py-muted text-small" id={statusId} role="status">
        {status}
      </p>
      <ul className="py-search-results-list" id={listId}>
        {children}
      </ul>
    </div>
  );
}
