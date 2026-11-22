A short list of links in the small text style, such as a site's navigation or the links under a project.

`links` is the list, in the order to show, each with its `label` and `href`. By default it is a row that wraps when the page is narrow, and every link is underlined. `stacked` sets the links one under another, as the pages in a `ProfileAside` and the groups in a `SiteFooter` are: they are known to be links by where they are, so none is underlined but the current one.

Mark the link to the page the reader is on, or to the language they read in, with `current`. Give a link whose label and page are in another language its `lang` (`ja` for "日本語" on an English page), so that the label is read and broken as that language.

It is a plain list: put it in a `nav` where it is the way around the site, as `SiteHeader` does.

- Do: keep labels to a word or two.
- Don't: use it for a list a reader works through, such as posts; that is an `IndexList` or a `WritingList`.
