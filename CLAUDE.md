# pylon

The design system of https://blog.yamat47.me/ and of my portfolio site: design tokens and React components,
published to npm as `@yamat47/pylon` and to Claude Design as a design system.

Nothing is built yet. This file records what is decided, so that the first pull requests start from it. Replace the
sections below with how the repository really works as it takes shape.

## What is decided

- **This repository is the source.** The npm package and the design system on Claude Design are copies made from it,
  the second with the `design-publish` skill. Nothing is edited in a copy and carried back by hand: copies drift
- **Two consumers, no more.** The blog (yamat47/blog) and the portfolio site depend on a version of the package. Demo
  sites and applications keep their own looks
- **Components are React TSX that render to static HTML.** A site renders them at build time, so a component must
  work without client-side JavaScript. The same components go into the bundle published to Claude Design
- **Design values live in the tokens only.** A component reads a token; it never holds a color, size, weight or font
  as a literal. The blog already keeps its values in one file (`src/styles/tokens.css`) for these tokens to replace

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

The colors the drawings used, as starting values for the tokens:

| Token | Light | Dark |
|---|---|---|
| Surface | `#FFFFFF` | `#111111` |
| Ink | `#1A1A1A` | `#EDEDED` |
| Muted ink | `#666666` | `#A3A3A3` |
| Border | `#E5E5E5` | `#2E2E2E` |
| Accent, as a mark or an underline | `#E8590C` | `#FF7A33` |
| Accent, as text | `#C2410C` | `#FF7A33` |

Text keeps a contrast of 4.5:1 or more against its surface, which is why the accent has a darker value for text on
the light surface.

## Not decided yet

- How the fonts reach a reader. Noto Sans JP is large; the options are files served by each site from this package,
  or Google Fonts, which would make every visit a request to Google
- The toolchain, and where components are looked at while they are developed
- Which components come first

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
