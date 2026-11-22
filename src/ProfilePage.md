The frame of a page of the portfolio: the profile column beside the content, and the footer under both.

`aside` is the profile column, a `ProfileAside`, and `footer` the site's `SiteFooter`. The children go into the page's `main`, a column as wide as what the profile column leaves of `width-page`. The profile column stays where it is while the content scrolls; on a window narrower than 48rem it stacks above the content and scrolls with it.

`lang` is the page's language, `en` or `ja`, written on the frame. Text that takes no style of its own is set in `text-body-latin` on an English page and in `text-body` on a Japanese one: a `Prose`, the text of an `AboutSection` and of a role in a `CareerList`. A `Text` or an `Introduction` is told the language by its own prop.

The blocks of the content stand `space-10` apart, a `Section` `space-24` from what is above it, and an `AboutSection` `space-14` from the one before it.

- Do: open the content with a `PageHeader`, except on the top page, whose `h1` is the name in the profile column (`heading` on `ProfileAside`).
- Don't: use it for the blog, whose pages are a `Page` under a `SiteHeader`, or set a width on the content yourself.
