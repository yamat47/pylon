The frame of a page: the header, the content and the footer, kept off the window's edges by the gutter.

`header` and `footer` are the site's, usually a `SiteHeader` and a `SiteFooter`. The children go into the page's `main`. `width` says how wide the content is: `wide` is the header's width (`width-page`), for an index; `text` is a centered column of `width-measure` with space above it, for something to read.

`Page` renders inside the site's `body`; the document around it (`html`, `head`) is the site's.

- Do: use one `Page` per page, and give the page one `h1`: the site's name on the top page (`heading` on `SiteHeader`), the page's own title elsewhere.
- Don't: nest a `Page` in another, or set a width on the content yourself.
