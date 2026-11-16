# pylon

The design system of https://blog.yamat47.me/ and of my portfolio site: design tokens and React components,
published to npm as `@yamat47/pylon` and to Claude Design as a design system.

So far it holds the tokens, the toolchain and the components of the blog's top page. The components of a post, the
fonts, the release to npm and the copy on Claude Design are still to come; "What is decided" and "Not decided yet"
below say where they are headed.

## Layout

| Path | Contents |
|---|---|
| `system/tokens.json` | The tokens: every color, text style, spacing, radius and line weight, each with what it is for. The file has the shape Claude Design reads for a design system, which is why it carries fields nothing here reads yet (`version`, `themes`, `fonts`, `sample`, the empty `shadow`) |
| `src/tokens.css` | The tokens as CSS variables, with a class for each text style. Generated from `system/tokens.json` and committed |
| `src/<Name>.tsx` | A component, with its guideline (`<Name>.md`) and its stories (`<Name>.stories.tsx`) beside it. `src/index.ts` exports them |
| `src/components.css` | The one stylesheet of the components, and of the page under them (`body`, links) |
| `src/fixtures.ts` | What the stories show: the blog's own names, links and posts |
| `.storybook/` | Storybook, where components are looked at: every story in light and dark, from the toolbar |
| `scripts/` | What generates `src/tokens.css` (`tokens.ts`, `tokens-css.ts`) and the contrast calculation |
| `docker/` | Development image and compose |
| `Makefile` | Entry point for development commands |

## Always run commands through make

Node and pnpm are not installed on the host. The toolchain exists only inside the Docker container, and the `Makefile`
invokes it with `docker compose -f docker/compose.yaml run`.
**Do not run `pnpm` `npm` `npx` `node` `tsc` `biome` directly on the host** (`permissions.deny` in
`.claude/settings.json` rejects them).

| Goal | Command |
|---|---|
| Typecheck, lint, test and build Storybook in one go | `make check` (CI runs the same, plus zizmor on the workflows) |
| Look at the components | `make storybook` (http://localhost:6006) / `make logs` / `make down` |
| Type check / lint / auto-fix / test | `make typecheck` / `make lint` / `make fix` / `make test` |
| Write `src/tokens.css` after editing the tokens | `make tokens` |
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
- **A component is three files and an export.** `<Name>.tsx`, a guideline `<Name>.md` (what it is, its props, a do
  and a don't) and `<Name>.stories.tsx`, exported from `src/index.ts`. A test fails when one is missing
- **A component renders to static HTML.** No hooks, no event handlers, no state: a site renders it at build time and
  ships no JavaScript for it. Nothing checks this yet. What a component works out goes in a `.ts` file beside it
  (`post-index.ts` for `PostIndex`), where a test can reach it: Node does not read `.tsx`
- **A component's CSS is in `src/components.css`, under classes that start with `py-`.** Colors, text styles, spacing
  and line weights are tokens. A number written there is a component's own measure (the width of a column) or a
  length relative to the text, with a comment saying which
- **A story is args only.** No `render` and no decorators of its own, so that the same story can be drawn somewhere
  other than Storybook (the previews on Claude Design, to come). A story that needs other components passes them as
  args. Stories show Japanese text from `src/fixtures.ts`, because that is what the sites carry
- **A token says what it is for.** Its `usage` in `system/tokens.json` is what a component's author and Claude Design
  read to choose it, so a token without a use is not added (a test refuses an empty one)
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
  weight or a font as a literal. The blog already keeps its values in one file (`src/styles/tokens.css`) for these
  tokens to replace

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
  centered column of text about 680px wide, under a header and above a footer that are 960px wide on every page
- Dates are numerals (`2025.02.13`)

The values are in `system/tokens.json`. The accent has two: the orange itself for an underline or a mark, and a
darker one for text on the light surface, where the orange is too pale to read.

## Not decided yet

- How the fonts reach a reader. Noto Sans JP is large; the options are files served by each site from this package,
  or Google Fonts, which would make every visit a request to Google. Until then the font stack ends in the system's
  gothic
- What a post is made of: its title and date, the rendered Markdown, a link card. The top page's components exist;
  these come next
- The colors of highlighted code

## Where the conventions live

- Follow the `writing-conventions` skill for comments, commits, and pull requests, the `typescript-idioms` skill for
  TypeScript, and the `react-patterns` skill for components
- Open pull requests with the `create-pr` skill
- Check Dependabot pull requests with the `review-dependency-bump` skill, and skill update pull requests with the
  `review-skill-update` skill
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

## How changes enter

`main` is protected: changes arrive through pull requests, with signed commits. The repository's settings are
declared in yamat47/infra-github, never changed by hand.
