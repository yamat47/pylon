import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement, Fragment } from "react";
import { cardPage, frameOf, frameWidth, readStories, Writer } from "./preview.ts";

function Card() {
  return null;
}
function Stranger() {
  return null;
}
const writer = new Writer(new Map([[Card, "Card"]]));

test("a story is written as the call that draws its component with its args", () => {
  const story = createElement(Card, { title: "題", count: 2, open: true, links: [{ href: "/" }] });
  assert.equal(
    writer.js(story, "story"),
    'h(P.Card, { "title": "題", "count": 2, "open": true, "links": [{ "href": "/" }] })',
  );
});

test("children are passed as arguments, as JSX passes them", () => {
  // A story's args hold the children as a prop, which is how they reach the writer.
  const args = { children: ["一", createElement("p", null, "二")] };
  const story = createElement(Card, args);
  assert.equal(writer.js(story, "story"), 'h(P.Card, null, "一", h("p", null, "二"))');
});

test("an element in the args is written as the element it is", () => {
  const header = createElement(Card, { title: "題" });
  const text = createElement(Fragment, null, createElement("a", { href: "/a" }, "A"));
  assert.equal(
    writer.js({ header, text }, "story"),
    '{ "header": h(P.Card, { "title": "題" }), "text": h(React.Fragment, null, h("a", { "href": "/a" }, "A")) }',
  );
});

test("an element keeps its key", () => {
  assert.equal(writer.js(createElement("li", { key: "a" }), "story"), 'h("li", { "key": "a" })');
});

test("no text can close the card's script", () => {
  const written = writer.js("</script><!-- <b>", "story");
  assert.ok(!written.includes("<"));
  assert.equal(JSON.parse(written), "</script><!-- <b>");
});

test("no key of an object can close the card's script either", () => {
  assert.ok(!writer.js({ "</script>": 1 }, "story").includes("<"));
});

test("an element of something that is not a component of the design system is refused", () => {
  assert.throws(
    () => writer.js(createElement(Stranger), "Page.stories.tsx TopPage"),
    /Page\.stories\.tsx TopPage: <Stranger> is not a design component/,
  );
});

test("a value a card cannot carry is refused, with where it is", () => {
  assert.throws(() => writer.js({ onClick: () => {} }, "story"), /story\.onClick: a card cannot/);
  assert.throws(() => writer.js({ at: new Date(0) }, "story"), /story\.at: a card cannot/);
});

test("a story file's frame is read from its meta's parameters", () => {
  assert.equal(frameOf({ docs: {}, card: { frame: "text" } }, "Card.stories.tsx"), "text");
});

test("a story file that does not say its frame, or says another setting, is refused", () => {
  assert.throws(() => frameOf({ docs: {} }, "Card.stories.tsx"), /no parameters\.card/);
  assert.throws(
    () => frameOf({ card: { frame: "narrow" } }, "Card.stories.tsx"),
    /Card\.stories\.tsx: parameters\.card\.frame is not one of text, wide, page/,
  );
  assert.throws(
    () => frameOf({ card: { frame: "text", height: 200 } }, "Card.stories.tsx"),
    /parameters\.card\.height is not a card setting/,
  );
});

// The tokens' lengths in px, as the build reads them.
const px = (token: string) =>
  ({ "width-measure": 680, "width-page": 960, "space-6": 24 })[token] ?? 0;

test("a column's frame is as wide as the tokens make the column, with the card's margin", () => {
  assert.equal(frameWidth("text", px), 680 + 2 * 24);
  assert.equal(frameWidth("wide", px), 960 + 2 * 24);
});

test("a page's frame is a desktop's window", () => {
  assert.equal(frameWidth("page", px), 1280);
});

const page = (frame: "text" | "page") =>
  cardPage({ name: "Card", group: "Text", frame, width: 728 }, [
    { title: "One", code: "h(P.Card, null)" },
    { title: "Two", code: "h(P.Card, null)" },
  ]);

test("a card starts with the line its page reads: the group, the width and the stories", () => {
  assert.equal(
    page("text").split("\n")[0],
    '<!-- @dsCard group="Text" width=728 subtitle="One, Two" -->',
  );
});

test("a card draws every story from the bundle's global, on a page that says it is Japanese", () => {
  const html = page("text");
  assert.ok(html.includes('<html lang="ja">'));
  assert.ok(html.includes("var P = window.Pylon, h = React.createElement;"));
  assert.equal(html.split('h("div", null, h(P.Card, null))').length - 1, 2);
});

test("stories stand inside the margin a column's frame counts, and a page has none", () => {
  assert.ok(page("text").includes("padding: var(--space-6);"));
  assert.ok(!page("page").includes("padding:"));
});

// A story file as Vite hands it over: the meta as the default export, a story per other export.
const meta = { title: "Text/Card", args: { tone: "ink" }, parameters: { card: { frame: "text" } } };

test("a story file gives its group, its frame and each story's args over the meta's", () => {
  const file = { default: meta, Plain: {}, Muted: { args: { tone: "muted", title: "題" } } };
  assert.deepEqual(readStories(file, "Card.stories.tsx"), {
    group: "Text",
    frame: "text",
    stories: [
      { exportName: "Plain", args: { tone: "ink" } },
      { exportName: "Muted", args: { tone: "muted", title: "題" } },
    ],
  });
});

test("a story that is not args only is refused, not left off the card", () => {
  const refused = (file: Record<string, unknown>, message: RegExp) =>
    assert.throws(() => readStories({ default: meta, ...file }, "Card.stories.tsx"), message);
  // A story written as a function, which Storybook would draw.
  refused({ Drawn: Card }, /Card\.stories\.tsx Drawn: a story is an object with args/);
  refused({ Drawn: { render: () => null } }, /Drawn: a render cannot reach the card/);
  refused({ Framed: { parameters: { card: { frame: "wide" } } } }, /belongs on the meta/);
  assert.throws(
    () => readStories({ default: { ...meta, decorators: [] }, Plain: {} }, "Card.stories.tsx"),
    /Plain: a decorators cannot reach the card/,
  );
});

test("a story file with no story, or a title a card cannot carry, is refused", () => {
  assert.throws(() => readStories({ default: meta }, "Card.stories.tsx"), /no story/);
  assert.throws(
    () =>
      readStories({ default: { ...meta, title: 'Text/"Card"' }, Plain: {} }, "Card.stories.tsx"),
    /a title with/,
  );
  assert.throws(() => readStories({ Plain: {} }, "Card.stories.tsx"), /no meta with a title/);
});
