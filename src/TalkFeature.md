The newest talk, large: its first slide, the day and the event, its title and its links. It opens the list of talks, and a `TalkList` of the rest follows it.

`talk` is the talk. Its `title` is set in `text-heading`, in its own `lang` where that is not the page's: a talk given in Japanese keeps its Japanese title on an English page. `date` is the day it was given, as `YYYY-MM-DD`, shown as `2026.05.07` before the `event`, which takes a `lang` of its own the same way. `links` are its slides, a video and the event's page. `slide` is its first slide, 16:9; left out, its place is tinted. The slide is a picture and not a link: the links under the title are where a reader goes.

`titleAs` is the element of the title: `h2` (the default) on the page of talks, under its `h1`, and `h3` in a `Section`.

- Do: use it once, for the newest talk.
- Don't: use it for every talk, or for something that is not a talk. A post is a `WritingList`, a project a `ProjectGrid`.
