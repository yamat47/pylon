/* @ds-bundle: {"format":4,"namespace":"Pylon","components":[{"name":"IndexList"},{"name":"LinkCard"},{"name":"LinkList"},{"name":"Page"},{"name":"PageHeader"},{"name":"PostIndex"},{"name":"Prose"},{"name":"SearchField"},{"name":"SearchResults"},{"name":"SiteFooter"},{"name":"SiteHeader"},{"name":"Text"}]} */
var Pylon = (function(exports) {
	Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
	// src/dates.ts
	var fullDate = (date) => date.replaceAll("-", ".");
	var monthDay = (date) => fullDate(date).slice(5);
	// src/IndexList.tsx
	var FIGURE = "py-muted text-figure";
	function IndexList({ groups }) {
		return /* @__PURE__ */ React.createElement("div", null, groups.map((group) => /* @__PURE__ */ React.createElement("section", {
			className: "py-index-list-group",
			key: group.label
		}, /* @__PURE__ */ React.createElement("h2", { className: "py-index-list-label py-muted text-label" }, group.label), /* @__PURE__ */ React.createElement("ul", { className: "py-index-list-items" }, group.items.map((item) => /* @__PURE__ */ React.createElement("li", {
			className: "py-index-list-item",
			key: item.href
		}, item.dateTime === void 0 ? /* @__PURE__ */ React.createElement("span", { className: FIGURE }, item.figure) : /* @__PURE__ */ React.createElement("time", {
			className: FIGURE,
			dateTime: item.dateTime
		}, item.figure), /* @__PURE__ */ React.createElement("a", {
			className: "py-plain-link py-phrases text-entry",
			href: item.href
		}, item.title)))))));
	}
	// src/data-attributes.ts
	var isDataName = (name) => name.startsWith("data-");
	function dataAttributes(given) {
		const kept = {};
		for (const [name, value] of Object.entries(given ?? {})) if (isDataName(name) && typeof value === "string") kept[name] = value;
		return kept;
	}
	// src/LinkCard.tsx
	function LinkCard({ href, title, description, site, date, image, linkAttributes }) {
		return /* @__PURE__ */ React.createElement("a", {
			className: "py-link-card py-plain-link",
			href,
			...dataAttributes(linkAttributes)
		}, /* @__PURE__ */ React.createElement("span", { className: "py-link-card-body" }, /* @__PURE__ */ React.createElement("span", { className: "py-link-card-clamp text-entry" }, title), description === void 0 ? null : /* @__PURE__ */ React.createElement("span", { className: "py-link-card-clamp py-muted text-small" }, description), /* @__PURE__ */ React.createElement("span", { className: "py-link-card-site py-muted text-small" }, date === void 0 ? site : `${site} · ${fullDate(date)}`)), image === void 0 ? null : /* @__PURE__ */ React.createElement("img", {
			className: "py-link-card-image",
			src: image,
			alt: "",
			loading: "lazy",
			decoding: "async",
			referrerPolicy: "no-referrer"
		}));
	}
	// src/LinkList.tsx
	function LinkList({ links }) {
		return /* @__PURE__ */ React.createElement("ul", { className: "py-link-list text-small" }, links.map((link) => /* @__PURE__ */ React.createElement("li", { key: link.href }, /* @__PURE__ */ React.createElement("a", { href: link.href }, link.label))));
	}
	// src/Page.tsx
	function Page({ header, footer, width, children }) {
		return /* @__PURE__ */ React.createElement("div", { className: "py-page" }, header, /* @__PURE__ */ React.createElement("main", { className: `py-page-main py-page-main-${width}` }, children), footer);
	}
	// src/Text.tsx
	function Text({ variant = "body", as: Tag = "p", tone = "ink", children }) {
		const muted = tone === "muted" ? " py-muted" : "";
		return /* @__PURE__ */ React.createElement(Tag, { className: `py-text text-${variant}${muted}` }, children);
	}
	// src/PageHeader.tsx
	function PageHeader({ title, date, dateAttributes }) {
		return /* @__PURE__ */ React.createElement("header", { className: "py-page-header py-phrases" }, date === void 0 ? null : /* @__PURE__ */ React.createElement("time", {
			className: "py-muted text-label",
			dateTime: date,
			...dataAttributes(dateAttributes)
		}, fullDate(date)), /* @__PURE__ */ React.createElement(Text, {
			variant: "title",
			as: "h1"
		}, title));
	}
	// src/post-index.ts
	function byYear(posts) {
		return [...Map.groupBy(posts, (post) => post.date.slice(0, 4))].map(([year, ofYear]) => ({
			label: year,
			items: ofYear.map((post) => ({
				title: post.title,
				href: post.href,
				figure: monthDay(post.date),
				dateTime: post.date
			}))
		}));
	}
	// src/PostIndex.tsx
	function PostIndex({ posts }) {
		return /* @__PURE__ */ React.createElement(IndexList, { groups: byYear(posts) });
	}
	// src/Prose.tsx
	function Prose({ children }) {
		return /* @__PURE__ */ React.createElement("div", { className: "py-prose" }, children);
	}
	// src/SearchField.tsx
	function SearchField({ id, name, label, placeholder }) {
		return /* @__PURE__ */ React.createElement("search", null, /* @__PURE__ */ React.createElement("form", null, /* @__PURE__ */ React.createElement("input", {
			className: "py-search-field text-body",
			id,
			type: "search",
			name,
			"aria-label": label,
			placeholder,
			autoComplete: "off"
		})));
	}
	// src/SearchResults.tsx
	function SearchResults({ statusId, listId, status, withoutScript, children }) {
		return /* @__PURE__ */ React.createElement("div", { className: "py-search-results" }, withoutScript === void 0 ? null : /* @__PURE__ */ React.createElement("noscript", null, /* @__PURE__ */ React.createElement("p", { className: "py-text py-muted text-small" }, withoutScript)), /* @__PURE__ */ React.createElement("p", {
			className: "py-text py-muted text-small",
			id: statusId,
			role: "status"
		}, status), /* @__PURE__ */ React.createElement("ul", {
			className: "py-search-results-list",
			id: listId
		}, children));
	}
	// src/SiteFooter.tsx
	function SiteFooter({ links }) {
		return /* @__PURE__ */ React.createElement("footer", { className: "py-site-footer" }, /* @__PURE__ */ React.createElement(LinkList, { links }));
	}
	// src/SiteHeader.tsx
	function SiteHeader({ name, href, description, heading = false, nav = [] }) {
		return /* @__PURE__ */ React.createElement("header", { className: "py-site-header" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Text, {
			variant: "site",
			as: heading ? "h1" : "p"
		}, /* @__PURE__ */ React.createElement("a", {
			className: "py-plain-link",
			href
		}, name)), description === void 0 ? null : /* @__PURE__ */ React.createElement(Text, {
			variant: "caption",
			tone: "muted"
		}, description)), nav.length === 0 ? null : /* @__PURE__ */ React.createElement("nav", null, /* @__PURE__ */ React.createElement(LinkList, { links: nav })));
	}
	exports.IndexList = IndexList;
	exports.LinkCard = LinkCard;
	exports.LinkList = LinkList;
	exports.Page = Page;
	exports.PageHeader = PageHeader;
	exports.PostIndex = PostIndex;
	exports.Prose = Prose;
	exports.SearchField = SearchField;
	exports.SearchResults = SearchResults;
	exports.SiteFooter = SiteFooter;
	exports.SiteHeader = SiteHeader;
	exports.Text = Text;
	exports.fullDate = fullDate;
	return exports;
})({});
