A list of posts as an index: each year once, at the start, with its posts beside it and a rule between years.

`posts` is every post to list, newest first, each with its `title`, its `href` and its `date` as `YYYY-MM-DD`. The index puts the posts of a year together, shows the year as the group's heading (`h2`) and each post's day as `02.13`. The site decides which day a post has (its time zone); the index only reads the figures.

On a narrow page the year moves above its posts. A long title wraps under itself, never under the day, and breaks between phrases where the browser can and the page says it is Japanese (`lang="ja"`).

- Do: pass the posts already sorted. The index keeps the order it is given.
- Don't: add a summary, a tag or a thumbnail to a row. The index is titles and dates; a reader scans it.
