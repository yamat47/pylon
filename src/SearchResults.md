What a search found: a line that says how it went, and under it the list of what was found.

`statusId` and `listId` are the ids of the line and of the list, by which the site's script finds them. The line is a status (`role="status"`), so a screen reader says it when it changes. `status` is what it says before a script has run. `withoutScript` is for a search that needs a script: what a reader whose browser runs none is told, in the line's place.

The list is filled by the site, usually by a script in the reader's browser, so its items carry no class and are styled by what they are. An item is an `li` holding, in this order:

- a `time` or a `span`: the date of what was found
- an `a`: its title, linking to it
- a `p`: the words around the match, with each matched word in a `mark`

A page that knows its results when it is built passes the same items as children.

- Do: say something in the line for every outcome: how many were found, that nothing was, that the search failed.
- Don't: put anything but such items in the list, or mark words in a title: the mark is for the words under it.
