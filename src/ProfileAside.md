The profile column of every page of the portfolio: who the person is, the site's pages, and where else to find them.

`name` links to `href`, the top page in the page's language, and `description` is one line under it in the muted ink. `photo` is a square photo of the person, rounded as every picture is; left out, its place is tinted. Set `heading` on the top page only: the name is that page's title, so it becomes the page's `h1`.

`pages` are the site's pages, one under another and not underlined, but for the one the reader is on: mark it `current`. Under a rule come `links`, a row of underlined links to elsewhere (an address to write to, the person's accounts), and `language`, the same page in the other language. Give that link its language as `lang` (`ja` for "日本語").

It goes in a `ProfilePage` as its `aside`, which keeps it in place while the content scrolls. On a window narrower than 48rem it stacks above the content: the photo smaller and beside the name, the pages in a row that wraps.

- Do: give the same `pages`, `links` and `language` on every page, so the column does not change from page to page but for the page marked current.
- Don't: put a button, a list of skills or a call to action in it. The column holds a photo, a name, a line and links.
