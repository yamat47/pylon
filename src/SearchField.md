The field a reader types a search into: one input, the whole width of its column.

`id` is the input's id, by which the site's script finds it; the form around it is the input's `form`. `name` is what the words are sent under if the form is submitted before a script runs (`q` gives `?q=`). `label` says what the field is for to a reader who cannot see it, and `placeholder` says it in the field while it is empty.

The component is the field only. Searching is the site's: its script listens to the input and fills a `SearchResults`. A search that runs as the reader types leaves Enter nothing to do, so the script cancels the form's submit; without that, Enter loads the page again with the words in its address.

- Do: put it under the page's title and above a `SearchResults`.
- Don't: use it for anything but a search. It is a `search` landmark, which a screen reader offers as the way to find things.
