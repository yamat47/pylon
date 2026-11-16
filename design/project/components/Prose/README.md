A text to read: the body of a post, or of any page that is paragraphs and headings.

The children are the blocks of the text, one after another, and `Prose` sets how each looks and the space between them. Most of the time they are what a site's Markdown renders to, so they are plain elements with no class: paragraphs, headings (`h2` to `h4`; the `h1` is the page's title, outside), lists, quotes, images with or without a caption (`figure`, `figcaption`), code. A `LinkCard` among them gets more space above and below. A quote is set in the muted ink beside a rule. A frame from another site, such as an embedded tweet, is taken to be a light page whatever it draws, which is what such a frame is to the browser: the page then shows through around it.

A component placed among the blocks keeps its own look: `Prose` gives way to any class.

- Do: put it in a `Page` of width `text`, under a `PageHeader`.
- Don't: nest a `Prose` in another, or use it to lay out parts of a page that are not text to read.
