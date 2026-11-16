A piece of text in one of the system's text styles, so that a component or a page sets text without writing a class or a size.

`variant` names the style: any text style of the tokens, by its name less `text-` (`title`, `body`, `caption`); what each is for is in the tokens. `as` says what the text is in the document (`h1`, `h2`, `h3`, `p`, `span`) and does not change how it looks: choose the style by the look and the element by the meaning. `tone="muted"` sets it in the muted ink, for what stands beside the text rather than being it. A bare `Text` is a paragraph of body text in the ink.

A `Text` has no space around it, so it goes inside something that lays it out, as `SiteHeader` lays out the site's name and the line under it. What lays out the blocks of a page's body (a title, then paragraphs) comes with the components of a post.

- Do: give every page one `h1`, whatever style it is set in.
- Don't: pick `as` for its looks, or use `label` and `figure` for anything but numerals: their figures are tabular.
