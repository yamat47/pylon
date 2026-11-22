pylon is the look of two sites that belong to one person: a blog and a portfolio. Both are pages to read, the blog mostly in Japanese, the portfolio in English and Japanese. The look is quiet and editorial: white space, black, white and greys, and one orange. The text does the work, and nothing decorates it. "pylon" is only a name: nothing in the design refers to American football.

## Content

- The sites are written in Japanese, with Latin words and numerals inside the sentences. Say so on the page (`lang="ja"`): a title then breaks between phrases, not inside a word.
- The portfolio is in English at `/` and in Japanese at `/ja/`, and every page links to itself in the other language. A title stays in the language its author wrote it in: a Japanese post keeps its Japanese title on an English page, marked `lang="ja"`.
- A title is a sentence as its author wrote it, quotation marks and brackets included: "「絶不調」がつづいていたら気をつけろ、と伝えている". Never shorten one, never set one in capitals.
- A date is numerals with full stops: `2025.02.13`. Where the year already stands beside it, it is the month and the day: `02.13`. A period is two dates, or one and a dash when it has not ended: `2022.12 – 2023.06`, `2025.05 –`. Never a month's name, never a weekday, never a slash.
- The site's own words are few and short: "検索", "プライバシーポリシー", "All 8 projects". The blog's header holds a name, one line under it and a few links. The portfolio's profile column holds a photo, the name, one line, the pages and the links to elsewhere. No slogan, no button, no call to action.
- A message says what happened, in a full sentence: "2件の記事が見つかりました。", "「アジャイル」を含む記事は見つかりませんでした。". No exclamation mark, no emoji.
- A post keeps whatever its author wrote. The rules above are for what the site says around it.

## Color

Black, white and greys, plus one orange, in a light and a dark theme. The theme follows the reader's system; there is no switch.

- `color-surface` is the page. `color-surface-sunken` is a block set into it, such as a code block. Nothing else is a surface but the footer: no cards with a fill, no bands of color, no gradients.
- The footer is the one band. `color-surface-footer` runs across the window under every page of both sites, and what is in it is drawn in the dark theme's colors in either theme.
- Set text in `color-ink`. Set what stands beside the text in `color-ink-muted`: a date, a year, a caption, a link card's description, the words around a search's match, a quote.
- `color-border` draws the rules between parts of a page and the edge of a link card. It is decoration: never let it be the only sign of something, such as where a field is. A field's edge is `color-ink-muted`.
- `color-accent` is the one color, and it is for marks, never for areas. On the light surface it is too pale to read, so text in the accent is `color-accent-ink`. "Links and states" below says where each appears.
- `color-mark` goes behind the words a search found, with `color-ink` on it. It has no other use.
- Every text color keeps 4.5:1 on `color-surface` and on `color-surface-sunken` in both themes, and on `color-surface-footer` in the dark theme's colors. `color-accent` keeps 3:1 on `color-surface`.

## Type

- One family for text, `sans`: Inter for Latin letters and numerals, Noto Sans JP for Japanese. Both are loaded here from Google Fonts by their names. The sites serve the same two fonts as their own files and fetch nothing from another host. `mono` is the reader's own monospace font and is for code only.
- A text style is used whole: its size, its weight and its line height together. Never set one of the three by itself.
- `text-title` is a page's title, once on a page. `text-heading`, `text-subheading` and `text-minor-heading` are the headings inside a text, in that order. On the portfolio `text-heading` is also a company's name on the career page, and `text-subheading` the name of a project, of a company in a short list and of a role. `text-body` is the text, on a tall line because it is Japanese.
- `text-lead` is the introduction that opens the portfolio's top page and its about page, one paragraph a step larger than the text.
- On a page in English, `text-body` and `text-lead` become `text-body-latin` and `text-lead-latin`: the same size and weight on a shorter line, because Latin letters need less space between lines than Japanese.
- `text-entry` is a title that links somewhere: a post in a list, a page in a link card, what a search found, a talk in a list.
- `text-small` is navigation, the footer, a caption and the lines of a link card under its title. `text-caption` is the one line under the site's name. `text-site` is the site's name.
- `text-label` and `text-figure` are for numerals, and their figures are tabular so that a column of dates lines up. `text-label` heads something: a year over its posts, a date over a title, the year over a talk's day. `text-figure` stands beside what it belongs to: a day before a post's title. The one place `text-label` is set in words is the name of a group of links in the footer.
- `text-code` is code, in a block or inside a sentence.
- No italics: Japanese has none. Emphasis is weight.

## Layout

- A page of the blog is a header, the content and a footer, kept off the window's edges by `width-gutter`. The header and the footer's content are `width-page` wide on every page, so the site's name stays in one place from page to page.
- There are two kinds of content. An index is `width-page` wide: groups with a label at the start, each group's rows beside it, a rule between groups. Something to read is one centered column of `width-measure`, about 42 Japanese characters of body text.
- A page of the portfolio has no header. Its profile column, `width-aside` wide, stands beside a column of `width-measure`, `space-14` apart, and the two fill `width-page`. The profile column stays where it is while the content scrolls. It is the one thing that does, and nothing covers it or is covered by it.
- On a window narrower than 48rem the profile column stacks above the content: the photo beside the name, and the pages in a row that wraps.
- The footer runs the width of the window. Its content keeps `width-page`: the name and the line under it where the profile column stands, the groups of links (the site's pages, elsewhere, the language) where the content stands, and under a rule the copyright: `©`, the year and the name.
- Space comes from the `space-` steps, and more of it is better than a rule. A heading stands away from what it ends and close to what it starts.
- `radius-sm` is the only rounding: a link card, a code block, a word of code, a field, a picture. Nothing is a pill or a circle, the photo of the person included.
- `stroke-hairline` is every rule and edge. `stroke-underline` is the heavier line: under a link, around the keyboard's focus, beside a quote, beside a role that has not ended.
- No shadows. Nothing floats over the page.
- A page never scrolls sideways. On a narrow window a group's label moves above its rows, navigation wraps under the site's name, and a grid falls into one column.

## Links and states

- A link in a text is `color-ink` with an underline in `color-accent`. A link known to be one by where it is has no underline: the site's name, a title in an index, a link card, the pages in the profile column and in the footer.
- The page the reader is on, and the language they read in, are underlined in `color-accent` where the others are not.
- On the career page each company's roles run along a line beside them: `stroke-underline` in `color-accent` beside a role that has not ended, `stroke-hairline` in `color-border` beside one that has.
- Under the pointer a link turns `color-accent-ink`, and a link card's edge turns `color-accent`.
- The keyboard's focus is an outline in `color-accent`, `space-1` away from the element.
- No motion: nothing fades, slides or grows.

## Imagery and marks

- There is no logo and no icon. The site's name is text. Do not draw a mark for it.
- A picture is one of these, and never decoration: a post's own photograph, the thumbnail of a page a link card points to, and on the portfolio the person's photo (square), a project's screenshot (16:10), a talk's first slide (16:9) and the about page's photographs (3:2, 4:3).
- A picture that fails to load, or is not there yet, leaves its place tinted in `color-surface-sunken`.
- Highlighted code has no colors yet.

## Components

Build a page from the components and from nothing else: a page that seems to need its own CSS or a class is missing a component. Each component's guideline says what it takes and what to give it.

- `Page` frames every page of the blog, with a `SiteHeader` and a `SiteFooter`. A top page holds a `PostIndex`. A page to read holds a `PageHeader` and a `Prose`. A search page holds a `SearchField` and a `SearchResults`.
- A page of the portfolio is a `ProfileAside` beside its content, above the same `SiteFooter`. Its lists differ by what leads them. Projects are a `ProjectGrid` of screenshots. Talks open with a `TalkFeature`, the newest talk with its first slide, and a `TalkList` follows, led by each talk's date. Writing is a `WritingList` of titles and dates, with no word of where each was published. Career is a `CareerList`.
- The portfolio's top page holds its introduction in `text-lead` and a few of each list, each under a heading with a link to its page. The about page holds a photograph and `AboutSection`s: work, open source, American football and games.
