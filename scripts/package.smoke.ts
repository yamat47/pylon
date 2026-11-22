// The package as it is built into dist/ and found by its own name, rendered the way a site
// renders it at build time: to HTML, in Node, with no bundler. Run after `build` (`pnpm run
// test:package`); it is not among the unit tests, which need no build.
//
// It runs in this repository, with the development dependencies installed, so it does not show
// that `dependencies` and `peerDependencies` name everything a site needs. The types a site sees
// are checked beside it (scripts/consumer).
import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

// By its own name, so that the `exports` of package.json are what is exercised. The types here
// are the sources': the specifier is not a literal, so that typecheck does not need a build.
const name = "@yamat47/pylon";
const pylon = (await import(name)) as typeof import("../src/index.ts");

test("a page of the built components renders to HTML that needs no JavaScript", () => {
  const html = renderToStaticMarkup(
    createElement(pylon.Page, {
      width: "wide",
      header: createElement(pylon.SiteHeader, { name: "A site", href: "/", heading: true }),
      footer: createElement(pylon.SiteFooter, {
        name: "A site",
        href: "/",
        groups: [{ label: "Site", links: [{ label: "Privacy", href: "/privacy" }] }],
        copyright: { year: 2026, holder: "Someone" },
      }),
      // biome-ignore lint/correctness/noChildrenProp: Node does not read JSX, and createElement's types take a required `children` only here
      children: createElement(pylon.PostIndex, {
        posts: [{ title: "A post", href: "/entry/a", date: "2025-02-13" }],
      }),
    }),
  );
  assert.match(html, /<h1[^>]*><a[^>]*href="\/">A site<\/a><\/h1>/);
  assert.match(html, /<time[^>]*dateTime="2025-02-13">02\.13<\/time>/i);
  assert.match(html, /<a[^>]*href="\/entry\/a">A post<\/a>/);
  // The footer's content is drawn in the dark theme whatever the page's theme.
  assert.match(html, /<footer[^>]*><div[^>]*data-theme="dark"/);
  // No handler and no script: nothing for a browser to run.
  assert.doesNotMatch(html, /<script|\son[a-z]+=/i);
});

test("what another site says is written as text, never as HTML", () => {
  const html = renderToStaticMarkup(
    createElement(pylon.LinkCard, {
      href: "https://example.com/",
      title: "<script>alert(1)</script>",
      description: '"><img src=x>',
      site: "example.com",
    }),
  );
  assert.doesNotMatch(html, /<script|<img/);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
});

test("what a site's tools read is written on the card's link and on a page's date", () => {
  const card = renderToStaticMarkup(
    createElement(pylon.LinkCard, {
      href: "https://example.com/",
      title: "A page",
      site: "example.com",
      linkAttributes: { "data-pagefind-ignore": "all" },
    }),
  );
  assert.match(card, /^<a [^>]*data-pagefind-ignore="all"/);

  const header = renderToStaticMarkup(
    createElement(pylon.PageHeader, {
      title: "A post",
      date: "2025-02-13",
      dateAttributes: { "data-pagefind-meta": "date" },
    }),
  );
  assert.match(header, /<time [^>]*data-pagefind-meta="date"[^>]*>2025\.02\.13<\/time>/);
  // Nowhere else: the title is not the date.
  assert.equal(header.match(/data-pagefind-meta/g)?.length, 1);
});

test("everything the package says a site can import is in the build", async () => {
  const { default: manifest } = await import("../package.json", { with: { type: "json" } });
  const targets = Object.values(manifest.exports).flatMap((target) =>
    typeof target === "string" ? [target] : Object.values(target),
  );
  for (const target of targets) {
    await access(new URL(`../${target}`, import.meta.url));
  }
});
