# pylon

The design system of [blog.yamat47.me](https://blog.yamat47.me/) and of my portfolio site: design tokens and React
components, to be published to npm as `@yamat47/pylon`.

Nothing is built yet. What is decided so far, including the look, is in [CLAUDE.md](CLAUDE.md).

It is the design of two sites of mine. The package is public so that those sites can install it; it is not meant as
a library for other projects, and its look may change without notice.

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
