A link to another page shown as a card: its title, a description, the site it is on, and a thumbnail.

`href` and `title` are the page's; `site` is the name of the site. `description`, `date` and `image` are optional: a page that gives none of them is a card of two lines. `date` is the day the page was published, as `YYYY-MM-DD`, and is shown after the site as `2025.02.13`. A title or a description longer than two lines is cut. The whole card is the link, and its edge takes the accent under the pointer.

The thumbnail is decoration: it has no alternative text, it is loaded when the card comes near the screen, and no referrer is sent to the site it comes from. One that fails to load leaves its place tinted; the card does not close up around it.

Everything a card shows comes from another site. Pass it as the text it is: the card writes it as text, never as HTML.

`linkAttributes` are `data-*` attributes written on the card's link, for the site's own tools: the mark that keeps a card's words out of a search index (`data-pagefind-ignore="all"`), for one. Anything else in it is left out.

- Do: use it for a link that stands on its own line in a text, to another site or to another page of the same one.
- Don't: use it for a link inside a sentence.
