# pylon

The design system of https://blog.yamat47.me/ and of my portfolio site: design tokens and React components,
published to npm as `@yamat47/pylon` and to Claude Design as a design system.

So far it holds the tokens, the fonts, the toolchain, the components of the blog's pages (the top page, a post, a
page with a title and text such as the privacy policy, and the search page) and of the portfolio's (the top page,
and the pages of projects, talks, writing, career and about, in English and Japanese), the build that a release
publishes, and the copy that Claude Design gets. "What is decided" and "Not decided yet" below say where things are
headed.

## Layout

| Path | Contents |
|---|---|
| `system/tokens.json` | The tokens: every color, text style, spacing, radius and line weight, each with what it is for. The file has the shape Claude Design reads for a design system, which is why it carries fields nothing else here reads (`version`, `themes`, the empty `fonts` and `shadow`). A style's `sample` is what the stories of `Text` show |
| `system/README.md`, `system/cover.html` | What the copy on Claude Design opens on: the brand book, which tells whoever designs with the system how to use it, and the cover above it. Written by hand, for that copy only |
| `src/tokens.css` | The tokens as CSS variables, with a class for each text style. Generated from `system/tokens.json` and committed |
| `src/fonts.css` | The two fonts the tokens name, loaded from the packages that carry their files (`@fontsource-variable/*`) |
| `src/styles.css` | The stylesheet a site loads: the fonts, the tokens and the components' styles, in that order |
| `src/<Name>.tsx` | A component, with its guideline (`<Name>.md`) and its stories (`<Name>.stories.tsx`) beside it. `src/index.ts` exports them |
| `src/components.css` | The one stylesheet of the components, and of the page under them (`body`, links) |
| `src/fixtures.ts`, `src/fixture-texts.tsx` | What the stories show: the blog's own names, links and posts, the portfolio's in English and Japanese, and what is more than a string: the text of one post as its Markdown would render it, and what a search found as the site's script would list it |
| `.storybook/` | Storybook, where components are looked at: every story in light and dark, from the toolbar |
| `scripts/` | What generates `src/tokens.css` (`tokens.ts`, `tokens-css.ts`), the contrast calculation, the test of the built package (`package.smoke.ts`), and what builds the copy for Claude Design (`project.ts`, with `preview.ts` for a component's card) |
| `design/project/`, `design/publish.json` | The copy of the design system that Claude Design gets, and where it goes. Generated ("Rules that are easy to break") |
| `tsconfig.build.json`, `dist/` | What the package is built from, and the build: JavaScript and types from `tsc`, the stylesheets and the tokens copied beside them. Not committed |
| `docker/` | Development image and compose |
| `Makefile` | Entry point for development commands |

## Always run commands through make

Node and pnpm are not installed on the host. The toolchain exists only inside the Docker container, and the `Makefile`
invokes it with `docker compose -f docker/compose.yaml run`.
**Do not run `pnpm` `npm` `npx` `node` `tsc` `biome` directly on the host** (`permissions.deny` in
`.claude/settings.json` rejects them).

| Goal | Command |
|---|---|
| Everything CI checks, in one go | `make check` (CI adds zizmor on the workflows) |
| Build the package as a release does | `make build` (`dist/`) |
| Look at the components | `make storybook` (http://localhost:6006) / `make logs` / `make down` |
| Type check / lint / auto-fix / test | `make typecheck` / `make lint` / `make fix` / `make test` |
| Write `src/tokens.css` after editing the tokens | `make tokens` |
| Write `design/project/` after a change that reaches the copy on Claude Design | `make project` (`make project-check` fails when it is stale) |
| Add or update dependencies | `make pnpm ARGS="add -D <pkg>"` (the lockfile is also updated on the host) |
| First run, or after changing the Dockerfile | `make setup` |

## Rules that are easy to break

- **A token is edited in `system/tokens.json`, never in `src/tokens.css`.** Run `make tokens` after an edit and commit
  both files; a test fails when they disagree
- **Text keeps a contrast of 4.5:1 against the surface it sits on, in both themes.** `scripts/tokens.test.ts` checks
  the pairs that are used together, and fails for a color that is in no pair and is not named there as decoration
- **A text style is used whole.** A component puts the style's class on an element (`text-heading`); a stylesheet
  that cannot, such as the one for a post's rendered Markdown, sets `font: var(--text-heading)`. Neither writes a
  size, a weight or a line height
- **Something becomes a component when it appears in two places, or when a site would otherwise write CSS or a
  class name to get it.** `Text` and `LinkList` are small for that reason; a box, a stack or a rule is not a
  component. A larger component is built from the smaller ones (`SiteHeader` from `Text` and `LinkList`,
  `PostIndex` from `IndexList`), and the general form comes before the one for posts, because the portfolio will
  list other things the same way. A component may also exist only to hold a decision of the look: `PostIndex` is
  one line, and keeps how a post's day is written (`02.13`) out of the sites
- **A site uses components, never the classes.** `py-*` and `text-*` are how the components and the stylesheet talk
  to each other. A page that needs a class to look right is missing a component. Inside the package, a component
  uses `Text` where the element needs nothing else, and writes the classes itself where it does (a `time`, a cell
  of a grid)
- **A component knows nothing of a site's tools.** What a tool reads off an element (a search index's marks, for
  one) reaches it as `data-*` attributes, in a prop named for the element they are written on (`linkAttributes`,
  `dateAttributes`) and typed `DataAttributes`. The component passes the prop through `dataAttributes`
  (`src/data-attributes.ts`), which drops everything else, so a class, a handler or HTML cannot arrive that way
- **A component is three files and an export.** `<Name>.tsx`, a guideline `<Name>.md` (what it is, its props, a do
  and a don't) and `<Name>.stories.tsx`, exported from `src/index.ts`. A test fails when one is missing
- **A component renders to static HTML.** No hooks, no event handlers, no state: a site renders it at build time and
  ships no JavaScript for it. The test of the built package (`scripts/package.smoke.ts`) renders one page, one
  card and one page header that way, and `scripts/consumer` compiles a site's use of the types; nothing checks
  every component. What a component works out goes in a `.ts` file beside it (`post-index.ts` for `PostIndex`,
  `dates.ts` for how a date is written), where a test can reach it: Node does not read `.tsx`
- **What is published imports no CSS.** `src/index.ts` exports components, types and `fullDate` only, so that the
  built JavaScript runs anywhere, Node included; a site loads `styles.css` beside it. The build is the entry and
  what it imports, so code reaches the package by being imported from `src/index.ts` and in no other way; the
  stylesheets and `system/tokens.json` are copied beside it
- **A component styles classes, except where it does not write the content.** What a site's Markdown renders to
  has no class, so the rules under `.py-prose` name elements (`h2`, `blockquote`, `img`); the items a site's
  script puts into a `SearchResults` have none either, and its guideline says what an item is made of. Those two,
  with `body` and links, are the only places a bare element is styled. How a block looks in a `Prose` is written
  with `:where(.py-prose)`, so that it weighs no more than the element and any component's class wins inside it;
  only the space between blocks is written at full weight
- **A component's CSS is in `src/components.css`, under classes that start with `py-`.** Colors, text styles, spacing
  and line weights are tokens. A number written there is a component's own measure (the width of a column) or a
  length relative to the text, with a comment saying which
- **A story is args only.** No `render` and no decorators of its own, because a story is drawn twice: in Storybook,
  and on the component's card in the copy on Claude Design, which is written from the args and refuses anything
  else. A story that needs other components passes them as args. Stories show the sites' own text from
  `src/fixtures.ts` and `src/fixture-texts.tsx`, because that is what the components carry: Japanese for the blog,
  English and Japanese for the portfolio. How wide a card lays its
  stories out is the one thing a story file says for the card alone: `parameters.card.frame` on its meta
  (`scripts/preview.ts`)
- **`design/project/` is built, committed, and published as it is.** After a change to a component, a story, a
  guideline, the tokens, the brand book or the cover, run `make project` and commit the folder with the change;
  `make check` fails when the two disagree. It reaches Claude Design only through the `design-publish` skill, which
  publishes a commit that is on the remote and records it in the copy ("Publishing to Claude Design"). The page
  there is read-only (`editing: code`): a change is made here, never there
- **A token says what it is for.** Its `usage` in `system/tokens.json` is what a component's author and Claude Design
  read to choose it, so a token without a use is not added (a test refuses an empty one)
- **A font is served by the site, never fetched from another one.** The font files come with the package, through
  the two `@fontsource-variable` dependencies, and `src/fonts.css` is the only place a font is loaded. A page that
  reads a font from Google or another host would tell that host about every visit, which the sites' privacy
  policies do not say. The tokens' font stack starts with the names those packages give their fonts, and a test
  fails when the two stop agreeing (`src/fonts.test.ts`); a wrong name would otherwise fall through to the
  system's gothic and look almost right
- **Keep dependencies few.** Everything here is also upkeep for the sites that install the package
- Tests run on Node's own test runner (`node --test`, files named `*.test.ts` beside what they test), and Node runs
  the scripts as TypeScript by stripping the types, so a module imports its neighbours with the `.ts` extension

## What is decided

- **This repository is the source.** The npm package and the design system on Claude Design are copies made from it,
  the second with the `design-publish` skill. Nothing is edited in a copy and carried back by hand: copies drift
- **Two consumers, no more.** The blog (yamat47/blog) and the portfolio site depend on a version of the package. Demo
  sites and applications keep their own looks
- **Components are React TSX that render to static HTML.** A site renders them at build time, so a component must
  work without client-side JavaScript. The same components go into the bundle published to Claude Design
- **Design values live in the tokens only.** A component reads a token; it never holds a color, a text size, a
  weight or a font as a literal
- **The copy on Claude Design gets its two fonts from Google Fonts** (decided 2026-11-17). Its page fetches a font
  it is given only the name of, so the copy's tokens name them as Google does (`Inter`, `Noto Sans JP`; the build
  drops the `Variable` the packages' names end in) and it carries no font file. Only someone who opens the design
  tool fetches from Google. The sites still serve their own files, and the rule about that above is unchanged

## The look

Chosen on 2026-11-15 from drawings of the blog's top page and of a post.

- Quiet and editorial: white space, restrained color, the text does the work
- Black, white and greys, plus one accent: an orange, for links and small marks only
- "pylon" is only a name. Nothing in the design refers to American football
- Type is gothic: Inter for Latin letters and numerals, Noto Sans JP for Japanese
- Light and dark, following the reader's system setting, so every color token has two values
- A link is ink-colored with an orange underline. A title in a list of posts has no underline and turns orange under
  the pointer
- The top page is an index: posts grouped by year, each with its day (`02.13`) beside the title. A post is one
  centered column of text about 680px wide, under a header that is 960px wide on every page, and above the footer:
  a band in the dark theme across the window, with its content 960px wide
- Dates are numerals (`2025.02.13`)

The values are in `system/tokens.json`. The accent has two: the orange itself for an underline or a mark, and a
darker one for text on the light surface, where the orange is too pale to read.

## The portfolio's look

Chosen on 2026-11-22 from a canvas of the portfolio's pages drawn with these tokens. The canvas also holds a
prototype that moves between the pages and the two languages, on its page "プロトタイプ":
https://claude.ai/artifact/R38L2jgQPruxcERpABEKaX

- A page is a profile column beside the content, not the blog's header: the person's photo, name and line, the
  pages, and the links to elsewhere. The column stands still while the content scrolls, and stacks above it on a
  narrow window
- English is the default (`/`) and Japanese is at `/ja/`. A title stays in its author's language. English text is
  set in the `-latin` text styles, on shorter lines than Japanese needs. They are styles of their own rather than
  a line height that follows `lang`, so that `tokens.json` keeps the shape Claude Design reads and each style
  stays one class. A component learns the page's language from a prop: `ProfilePage`, the portfolio page's
  frame, takes the page's `lang` and sets its text in `text-body-latin` for English, and a component that sets
  `text-body` or `text-lead` itself takes the language the same way (`Introduction`). The others set no text style
  of their own for their text and inherit the frame's
- The lists differ by what leads them. Projects are a grid of screenshots. Talks open with the newest talk and its
  first slide, and list the rest by date, the year small over a large day. Writing is titles and dates only,
  grouped by year, without where each was published. Career runs each company's roles along a line, in the accent
  beside the roles that have not ended
- An about page tells work, open source, American football and games, with photographs. The top page's
  introduction links to it
- Both sites end with the same footer: the name and line, groups of links (the site's pages, elsewhere, the
  language) and the copyright, on a band in the dark theme. It replaces the blog's quiet footer and is the one
  band of color the look allows

## Not decided yet

- The colors of highlighted code. `Prose` sets code in the `code` text style on a tint and gives it no colors; no
  post has a block of code yet

## Where the conventions live

- Follow the `writing-conventions` skill for comments, commits, and pull requests, the `typescript-idioms` skill for
  TypeScript, and the `react-patterns` skill for components
- Open pull requests with the `create-pr` skill
- Check Dependabot pull requests with the `review-dependency-bump` skill, and skill update pull requests with the
  `review-skill-update` skill. A bump of the toolchain can change the bytes of `design/project/` (the bundle is the
  bundler's output, the types are `tsc`'s): when `project-check` fails on one, `make project` is committed to that
  pull request
- The skills in `.claude/skills/` are installed from yamat47/github-toolkit. Do not edit them here. Rules specific to
  this repository live in this file; when they conflict with a skill, this file wins

## Language

Everything written here is in English: documents, comments, commit messages, pull requests. The sites' own text is
Japanese, so components and their examples must be checked with Japanese text.

## No trace of Claude Code in the output

Commit messages, pull request titles and bodies, issues, comments on GitHub, and every file that
enters the repository must not show that Claude Code produced them. That means none of:

- `Co-Authored-By: Claude ...` trailers
- `Claude-Session: ...` trailers or `https://claude.ai/code/session_...` URLs
- `🤖 Generated with [Claude Code](...)` footers
- any similar signature, link, or footer saying an AI took part

This overrides the harness's default attribution instructions. `.claude/settings.json` disables
the automatic trailers, but that covers only what the harness adds by itself: read every commit
message and PR body before creating it. The commit author must be the repository owner
(`git config user.name` / `user.email` matching the history on `main`), not an AI identity.

## Publishing to Claude Design

The copy is the artifact named in `design/publish.json`. It is published from `main`, after the pull request that
changed `design/project/` is merged: ask for it in a session ("publish the design") and the `design-publish` skill
does the rest. A session that starts here may run the skill's status check, which writes nothing, to see whether
the copy is behind `main`. The skill runs `make project-check` first; unlike what the skill expects, a failure
leaves the folder as it was, so run `make project` and commit. Publishing changes no site: the sites get a change
through a release of the package.

## Releasing

The steps are in `README.md` ("Releasing"). Two rules beside them:

- **The owner pushes the tag.** A session prepares the pull request that raises the version and stops there: it
  publishes nothing, by any route
- **A change that a site would notice raises the version in the pull request that makes it:** a component's props,
  a token's name, what `styles.css` does to a page, and the shape of `tokens.json`, which is `system/tokens.json`
  as it is: a site reads a color out of it by the names of its fields

## How changes enter

`main` is protected: changes arrive through pull requests, with signed commits. The repository's settings are
declared in yamat47/infra-github, never changed by hand.
