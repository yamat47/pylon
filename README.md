# pylon

The design system of [blog.yamat47.me](https://blog.yamat47.me/) and of my portfolio site: design tokens and React
components, to be published to npm as `@yamat47/pylon`.

So far it holds the tokens ([`system/tokens.json`](system/tokens.json), and the CSS generated from them,
[`src/tokens.css`](src/tokens.css)) and the components the blog's top page, a post and a page of text are made of
([`src/`](src/)), with the two fonts they are set in. The first release is still to come. What is decided so far,
including the look, is in [CLAUDE.md](CLAUDE.md).

It is the design of two sites of mine. The package is public so that those sites can install it; it is not meant as
a library for other projects, and its look may change without notice.

## Development

Everything runs in Docker; only Docker and `make` are needed on the host.

```sh
make setup     # build the image and install the dependencies
make storybook # the components at http://localhost:6006 (make down stops it)
make tokens    # write src/tokens.css after editing system/tokens.json
make check     # typecheck, lint, test, and build Storybook
make help      # list the targets
```

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
