pylon is the look of two sites that belong to one person: a blog and a portfolio. Both are pages to read, mostly in Japanese. The look is quiet and editorial: white space, black, white and greys, and one orange. The text does the work, and nothing decorates it. "pylon" is only a name: nothing in the design refers to American football.

## Content

- The sites are written in Japanese, with Latin words and numerals inside the sentences. Say so on the page (`lang="ja"`): a title then breaks between phrases, not inside a word.
- A title is a sentence as its author wrote it, quotation marks and brackets included: "「絶不調」がつづいていたら気をつけろ、と伝えている". Never shorten one, never set one in capitals.
- A date is numerals with full stops: `2025.02.13`. Where the year already stands beside it, it is the month and the day: `02.13`. Never a month's name, never a weekday, never a slash.
- The site's own words are few and short: "検索", "プライバシーポリシー". A header holds a name, one line under it and a few links. No slogan, no button, no call to action.
- A message says what happened, in a full sentence: "2件の記事が見つかりました。", "「アジャイル」を含む記事は見つかりませんでした。". No exclamation mark, no emoji.
- A post keeps whatever its author wrote. The rules above are for what the site says around it.

## Color

Black, white and greys, plus one orange, in a light and a dark theme. The theme follows the reader's system; there is no switch.

- `color-surface` is the page. `color-surface-sunken` is a block set into it, such as a code block. Nothing else is a surface: no cards with a fill, no bands of color, no gradients.
- Set text in `color-ink`. Set what stands beside the text in `color-ink-muted`: a date, a year, a caption, a link card's description, the words around a search's match, a quote.
- `color-border` draws the rules between parts of a page and the edge of a link card. It is decoration: never let it be the only sign of something, such as where a field is. A field's edge is `color-ink-muted`.
- `color-accent` is the one color, and it is for marks, never for areas. On the light surface it is too pale to read, so text in the accent is `color-accent-ink`. "Links and states" below says where each appears.
- `color-mark` goes behind the words a search found, with `color-ink` on it. It has no other use.
- Every text color keeps 4.5:1 on `color-surface` and on `color-surface-sunken` in both themes, and `color-accent` keeps 3:1 on `color-surface`.

## Type

- One family for text, `sans`: Inter for Latin letters and numerals, Noto Sans JP for Japanese. Both are loaded here from Google Fonts by their names. The sites serve the same two fonts as their own files and fetch nothing from another host. `mono` is the reader's own monospace font and is for code only.
- A text style is used whole: its size, its weight and its line height together. Never set one of the three by itself.
- `text-title` is a page's title, once on a page. `text-heading`, `text-subheading` and `text-minor-heading` are the headings inside a text, in that order. `text-body` is the text, on a tall line because it is Japanese.
- `text-entry` is a title that links somewhere: a post in a list, a page in a link card, what a search found.
- `text-small` is navigation, the footer, a caption and the lines of a link card under its title. `text-caption` is the one line under the site's name. `text-site` is the site's name.
- `text-label` and `text-figure` are for numerals, and their figures are tabular so that a column of dates lines up. `text-label` heads something: a year over its posts, a date over a title. `text-figure` stands beside what it belongs to: a day before a post's title.
- `text-code` is code, in a block or inside a sentence.
- No italics: Japanese has none. Emphasis is weight.

## Layout

- A page is a header, the content and a footer, kept off the window's edges by `width-gutter`. The header and the footer are `width-page` wide on every page, so the site's name stays in one place from page to page.
- There are two kinds of content. An index is `width-page` wide: groups with a label at the start, each group's rows beside it, a rule between groups. Something to read is one centered column of `width-measure`, about 42 Japanese characters of body text.
- Space comes from the `space-` steps, and more of it is better than a rule. A heading stands away from what it ends and close to what it starts.
- `radius-sm` is the only rounding: a link card, a code block, a word of code, a field. Nothing is a pill or a circle.
- `stroke-hairline` is every rule and edge. `stroke-underline` is the heavier line: under a link, around the keyboard's focus, beside a quote.
- No shadows. Nothing floats over the page.
- A page never scrolls sideways. On a narrow window a group's label moves above its rows, and navigation wraps under the site's name.

## Links and states

- A link in a text is `color-ink` with an underline in `color-accent`. A link known to be one by where it is has no underline: the site's name, a title in an index, a link card.
- Under the pointer a link turns `color-accent-ink`, and a link card's edge turns `color-accent`.
- The keyboard's focus is an outline in `color-accent`, `space-1` away from the element.
- No motion: nothing fades, slides or grows.

## Imagery and marks

- There is no logo and no icon. The site's name is text. Do not draw a mark for it.
- A picture is a post's own photograph, or the thumbnail of a page a link card points to. It is never decoration. A thumbnail that fails to load leaves its place tinted.
- Highlighted code has no colors yet.

## Components

Build a page from the components and from nothing else: a page that seems to need its own CSS or a class is missing a component. Each component's guideline says what it takes and what to give it. `Page` frames every page, with a `SiteHeader` and a `SiteFooter`. A top page holds a `PostIndex`. A page to read holds a `PageHeader` and a `Prose`. A search page holds a `SearchField` and a `SearchResults`.
