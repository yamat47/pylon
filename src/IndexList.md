A list to scan, as an index: groups with a label at the start, each group's rows beside it, a rule between groups.

`groups` is the list, in the order to show. A group has a `label`, shown as its heading, and `items`. The label is a year or another short numeral: it is set in the style for numerals and has a narrow column. The heading is an `h2`, so the list goes directly under a page's title. An item is a short `figure`, then a `title` that links to `href`. When the figure stands for a date, give the date as `dateTime` (`YYYY-MM-DD`) and it is marked up as one.

On a narrow page a label moves above its rows. A long title wraps under itself, never under the figure, and breaks between phrases where the browser can and the page says it is Japanese (`lang="ja"`).

For posts by year there is `PostIndex`, which makes the groups from the posts.

- Do: keep figures to about five characters (`02.13`, `2024`); they share one narrow column.
- Don't: add a summary, a tag or a thumbnail to a row. A row is a figure and a title; a reader scans it.
