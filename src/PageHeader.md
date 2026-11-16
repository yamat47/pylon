The top of a page's content: its title, and over it the day the page is dated when it has one.

`title` is the page's title and its `h1`. `date` is for a page that is dated, such as a post: the day as `YYYY-MM-DD`, shown as `2025.02.13`. The site decides which day that is (its time zone). A page such as a privacy policy has a title and no date.

`dateAttributes` are `data-*` attributes written on the date's `time`, for the site's own tools: a search index can take the date from there, or leave it out of the text it searches. Anything else in it is left out.

A long title breaks between phrases where the browser can and the page says it is Japanese (`lang="ja"`). The space under the header, before the text, is the header's own.

- Do: follow it with a `Prose`, in a `Page` of width `text`.
- Don't: use it on the top page, whose title is the site's name (`heading` on `SiteHeader`), or twice on a page.
