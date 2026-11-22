The top of a page's content: its title, and over it the day the page is dated when it has one.

`title` is the page's title and its `h1`. `date` is for a page that is dated, such as a post: the day as `YYYY-MM-DD`, shown as `2025.02.13`. The site decides which day that is (its time zone). A page such as a privacy policy has a title and no date. `count` is for a page that is a list, such as the portfolio's projects: how many things it lists, shown beside the title in the muted ink (`Projects 8`).

`dateAttributes` are `data-*` attributes written on the date's `time`, for the site's own tools: a search index can take the date from there, or leave it out of the text it searches. Anything else in it is left out.

A long title breaks between phrases where the browser can and the page says it is Japanese (`lang="ja"`). The space under the header, before the text, is the header's own.

- Do: follow it with a `Prose`, in a `Page` of width `text`, or with the list a page of the portfolio is, in a `ProfilePage`.
- Don't: use it on a top page, whose title is the site's name (`heading` on `SiteHeader`) or the person's (`heading` on `ProfileAside`), or twice on a page.
