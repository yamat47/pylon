# pylon

The design system of [blog.yamat47.me](https://blog.yamat47.me/) and of my portfolio site: design tokens and React
components, published to npm as [`@yamat47/pylon`](https://www.npmjs.com/package/@yamat47/pylon).

It holds the tokens ([`system/tokens.json`](system/tokens.json), and the CSS generated from them,
[`src/tokens.css`](src/tokens.css)) and the components the blog's top page, a post and a page of text are made of
([`src/`](src/)), with the two fonts they are set in. What is decided so far, including the look, is in
[CLAUDE.md](CLAUDE.md).

It is the design of two sites of mine. The package is public so that those sites can install it; it is not meant as
a library for other projects, and its look may change without notice.

## Using it in a site

```sh
pnpm add @yamat47/pylon react
```

The components are React, written to be rendered to HTML when the site is built: they hold no state and no
handlers, so the site ships no JavaScript for them. The look is one stylesheet, loaded once.

```tsx
import { Page, PostIndex, SiteFooter, SiteHeader } from "@yamat47/pylon";
import "@yamat47/pylon/styles.css";
```

`styles.css` is the fonts, the tokens and the components' styles in the order they have to load. The page has to
say it is Japanese (`lang="ja"`) for titles to break between phrases.

## Development

Everything runs in Docker; only Docker and `make` are needed on the host.

```sh
make setup     # build the image and install the dependencies
make storybook # the components at http://localhost:6006 (make down stops it)
make tokens    # write src/tokens.css after editing system/tokens.json
make build     # build the package into dist/, as a release does
make check     # everything CI checks
make help      # list the targets
```

## Releasing

The version is `version` in `package.json` and the git tag `vX.Y.Z`. To release: raise the version in a pull
request, and once it is on `main` and CI has passed, push the tag. `.github/workflows/release.yml` refuses a tag
that is not on `main` or does not match the version, runs the checks, builds and publishes. Publishing cannot be
undone.

The workflow holds no token: npm trusts this repository's `release.yml` in the `release` environment (trusted
publishing), which is registered in the package's settings on npmjs.com. npm only lets a trusted publisher be
registered for a package that exists, so 0.0.1 was published by hand to make the name exist. It has no tag. 0.1.0
is the first version released by its tag, and the first one meant for a site.

## Skills

The skills under `.claude/skills/` are not written here. They are installed from
[yamat47/github-toolkit](https://github.com/yamat47/github-toolkit) and committed, so do not edit them in place:
change them upstream and wait for the release.

```sh
gh skill install yamat47/github-toolkit <skill-name> --agent claude-code --scope project
```

| Skill | Used for |
| --- | --- |
| `create-pr` | from uncommitted changes to a draft pull request |
| `review-pr` | local review of a diff before it is pushed |
| `writing-conventions` | house style for comments, commits, pull requests and docs |
| `github-actions-workflows` | rules for editing `.github/workflows/` |
| `review-dependency-bump` | reviewing Dependabot's dependency bumps |
| `review-skill-update` | reviewing the pull requests `update-skills` opens |
| `typescript-idioms` | language-level TypeScript |
| `react-patterns` | React components |
| `design-publish` | publishing the built design system to Claude Design |

`update-skills.yml` runs `gh skill update --all` monthly and opens a pull request with `github.token`, which the
`pylon` entry in yamat47/infra-github allows (`actions_can_create_pull_requests`).
