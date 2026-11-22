Where the person has worked: each company with its roles along a line, in the accent beside the roles that have not ended.

`companies` is the list, the latest first. A company has a `name` and its `roles`, the latest first, at least one. A role has a `title`, the month it began (`start`) and, where it has, ended (`end`), as `YYYY-MM`, and a few sentences on what the person did (`text`). A company's own period runs from its first role's start to its latest role's end, so it is never given twice. A period is shown as `2022.12 – 2023.06`, or `2025.05 –` while it goes on.

As it is, the list is the career page: each company an `h2` with its period, and under it its roles, each an `h3` with its period over it and its text under it, in the page's body text. Set `brief` for a few lines on the top page, in a `Section`: each company once, with its period and its latest role.

The line beside a role that goes on is the accent at `stroke-underline`; beside one that has ended it is a hairline in `color-border`. The period says the same in words, so the line is never the only sign.

- Do: write a role's text as what the person did and what came of it.
- Don't: list the roles of every company as one list. A role belongs under the company it was held at.
