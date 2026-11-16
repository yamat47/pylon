A site's posts as an `IndexList`: each year once, with its posts beside it.

`posts` is every post to list, newest first, each with its `title`, its `href` and its `date` as `YYYY-MM-DD`. The index puts the posts of a year together under that year and shows each post's day as `02.13`. The site decides which day a post has (its time zone); the index only reads the figures.

How it looks and behaves is `IndexList`'s; this component only makes the groups.

- Do: pass the posts already sorted. The index keeps the order it is given.
- Don't: use it for a list that is not grouped by year; give `IndexList` the groups yourself.
