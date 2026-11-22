/* @ds-bundle: {"format":4,"namespace":"Pylon","components":[{"name":"AboutSection"},{"name":"CareerList"},{"name":"IndexList"},{"name":"Introduction"},{"name":"LinkCard"},{"name":"LinkList"},{"name":"Page"},{"name":"PageHeader"},{"name":"Picture"},{"name":"PostIndex"},{"name":"ProfileAside"},{"name":"ProfilePage"},{"name":"ProjectGrid"},{"name":"Prose"},{"name":"SearchField"},{"name":"SearchResults"},{"name":"Section"},{"name":"SiteFooter"},{"name":"SiteHeader"},{"name":"TalkFeature"},{"name":"TalkList"},{"name":"Text"},{"name":"WritingList"}]} */
var Pylon = (function(exports) {
	Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
	// src/LinkList.tsx
	function LinkList({ links, stacked = false }) {
		return /* @__PURE__ */ React.createElement("ul", { className: `py-link-list${stacked ? " py-link-list-stacked" : ""} text-small` }, links.map((link) => /* @__PURE__ */ React.createElement("li", { key: link.href }, /* @__PURE__ */ React.createElement("a", {
			className: stacked && link.current !== true ? "py-plain-link" : void 0,
			href: link.href,
			"aria-current": link.current === true ? "page" : void 0,
			lang: link.lang,
			hrefLang: link.lang
		}, link.label))));
	}
	// src/Picture.tsx
	function Picture({ image, ratio }) {
		const className = `py-picture py-picture-${ratio.replace(":", "-")}`;
		if (image === void 0) return /* @__PURE__ */ React.createElement("span", {
			className,
			"aria-hidden": "true"
		});
		return /* @__PURE__ */ React.createElement("img", {
			className,
			src: image.src,
			alt: image.alt,
			loading: "lazy",
			decoding: "async"
		});
	}
	// src/Prose.tsx
	function Prose({ children }) {
		return /* @__PURE__ */ React.createElement("div", { className: "py-prose" }, children);
	}
	// src/Text.tsx
	function Text({ variant = "body", as: Tag = "p", tone = "ink", children }) {
		const muted = tone === "muted" ? " py-muted" : "";
		return /* @__PURE__ */ React.createElement(Tag, { className: `py-text text-${variant}${muted}` }, children);
	}
	// src/AboutSection.tsx
	function AboutSection({ title, children, photos = [], links = [] }) {
		return /* @__PURE__ */ React.createElement("section", { className: "py-about-section" }, /* @__PURE__ */ React.createElement(Text, {
			variant: "heading",
			as: "h2"
		}, title), /* @__PURE__ */ React.createElement(Prose, null, children), photos.length === 0 ? null : /* @__PURE__ */ React.createElement("div", { className: "py-about-section-photos" }, photos.map((photo) => /* @__PURE__ */ React.createElement(Picture, {
			key: photo.src,
			image: photo,
			ratio: "4:3"
		}))), links.length === 0 ? null : /* @__PURE__ */ React.createElement(LinkList, { links }));
	}
	// src/dates.ts
	var fullDate = (date) => date.replaceAll("-", ".");
	var monthDay = (date) => fullDate(date).slice(5);
	function period(start, end) {
		if (end === void 0) return `${fullDate(start)} –`;
		return end === start ? fullDate(start) : `${fullDate(start)} – ${fullDate(end)}`;
	}
	// src/career-list.ts
	function tenure(company) {
		const [latest] = company.roles;
		return period((company.roles.at(-1) ?? latest).start, latest.end);
	}
	var goesOn = (role) => role.end === void 0;
	// src/CareerList.tsx
	var along = (going) => `py-career-row${going ? " py-career-row-current" : ""}`;
	function CareerList({ companies, brief = false }) {
		if (brief) return /* @__PURE__ */ React.createElement("ol", { className: "py-career-brief" }, companies.map((company) => /* @__PURE__ */ React.createElement("li", {
			className: along(goesOn(company.roles[0])),
			key: company.name
		}, /* @__PURE__ */ React.createElement("span", { className: "py-muted text-figure" }, tenure(company)), /* @__PURE__ */ React.createElement("span", { className: "text-subheading" }, company.name), /* @__PURE__ */ React.createElement("span", { className: "py-muted text-small" }, company.roles[0].title))));
		return /* @__PURE__ */ React.createElement("div", { className: "py-career-list" }, companies.map((company) => /* @__PURE__ */ React.createElement("section", { key: company.name }, /* @__PURE__ */ React.createElement("div", { className: "py-career-company" }, /* @__PURE__ */ React.createElement("h2", { className: "py-text py-phrases text-heading" }, company.name), /* @__PURE__ */ React.createElement("span", { className: "py-muted text-figure" }, tenure(company))), /* @__PURE__ */ React.createElement("ol", { className: "py-career-roles" }, company.roles.map((role) => /* @__PURE__ */ React.createElement("li", {
			className: along(goesOn(role)),
			key: `${role.start} ${role.title}`
		}, /* @__PURE__ */ React.createElement(Text, {
			variant: "figure",
			tone: "muted"
		}, period(role.start, role.end)), /* @__PURE__ */ React.createElement("h3", { className: "py-text py-phrases text-subheading" }, role.title), role.text === void 0 ? null : /* @__PURE__ */ React.createElement("p", { className: "py-career-role-text py-text" }, role.text)))))));
	}
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
	// src/Introduction.tsx
	function Introduction({ lang, children, more }) {
		return /* @__PURE__ */ React.createElement("div", { className: "py-introduction" }, /* @__PURE__ */ React.createElement(Text, { variant: lang === "en" ? "lead-latin" : "lead" }, children), more === void 0 ? null : /* @__PURE__ */ React.createElement("p", { className: "py-text text-small" }, /* @__PURE__ */ React.createElement("a", { href: more.href }, more.label)));
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
	// src/Page.tsx
	function Page({ header, footer, width, children }) {
		return /* @__PURE__ */ React.createElement("div", { className: "py-frame" }, /* @__PURE__ */ React.createElement("div", { className: "py-frame-body" }, header, /* @__PURE__ */ React.createElement("main", { className: `py-page-main py-page-main-${width}` }, children)), footer);
	}
	// src/PageHeader.tsx
	function PageHeader({ title, date, dateAttributes, count }) {
		const heading = /* @__PURE__ */ React.createElement(Text, {
			variant: "title",
			as: "h1"
		}, title);
		return /* @__PURE__ */ React.createElement("header", { className: "py-page-header py-phrases" }, date === void 0 ? null : /* @__PURE__ */ React.createElement("time", {
			className: "py-muted text-label",
			dateTime: date,
			...dataAttributes(dateAttributes)
		}, fullDate(date)), count === void 0 ? heading : /* @__PURE__ */ React.createElement("div", { className: "py-page-header-counted" }, heading, /* @__PURE__ */ React.createElement("span", { className: "py-muted text-figure" }, count)));
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
	// src/ProfileAside.tsx
	function ProfileAside({ name, href, description, photo, heading = false, pages, links = [], language }) {
		return /* @__PURE__ */ React.createElement("aside", { className: "py-profile-aside" }, /* @__PURE__ */ React.createElement("div", { className: "py-profile-aside-identity" }, /* @__PURE__ */ React.createElement("div", { className: "py-profile-aside-photo" }, /* @__PURE__ */ React.createElement(Picture, {
			image: photo,
			ratio: "1:1"
		})), /* @__PURE__ */ React.createElement("div", { className: "py-profile-aside-name" }, /* @__PURE__ */ React.createElement(Text, {
			variant: "heading",
			as: heading ? "h1" : "p"
		}, /* @__PURE__ */ React.createElement("a", {
			className: "py-plain-link",
			href
		}, name)), description === void 0 ? null : /* @__PURE__ */ React.createElement(Text, {
			variant: "small",
			tone: "muted"
		}, description))), /* @__PURE__ */ React.createElement("nav", { className: "py-profile-aside-pages" }, /* @__PURE__ */ React.createElement(LinkList, {
			links: pages,
			stacked: true
		})), links.length === 0 && language === void 0 ? null : /* @__PURE__ */ React.createElement("div", { className: "py-profile-aside-elsewhere" }, links.length === 0 ? null : /* @__PURE__ */ React.createElement(LinkList, { links }), language === void 0 ? null : /* @__PURE__ */ React.createElement(LinkList, {
			links: [language],
			stacked: true
		})));
	}
	// src/ProfilePage.tsx
	function ProfilePage({ lang, aside, footer, children }) {
		const body = lang === "en" ? "text-body-latin" : "text-body";
		return /* @__PURE__ */ React.createElement("div", {
			className: `py-frame ${body}`,
			lang
		}, /* @__PURE__ */ React.createElement("div", { className: "py-frame-body" }, /* @__PURE__ */ React.createElement("div", { className: "py-profile-page" }, aside, /* @__PURE__ */ React.createElement("main", { className: "py-profile-page-main" }, children))), footer);
	}
	// src/ProjectGrid.tsx
	function ProjectGrid({ projects, titleAs = "h2" }) {
		return /* @__PURE__ */ React.createElement("ul", { className: "py-project-grid" }, projects.map((project) => /* @__PURE__ */ React.createElement("li", {
			className: "py-project",
			key: project.name
		}, /* @__PURE__ */ React.createElement(Picture, {
			image: project.screenshot,
			ratio: "16:10"
		}), /* @__PURE__ */ React.createElement("div", { className: "py-project-head" }, /* @__PURE__ */ React.createElement(Text, {
			variant: "subheading",
			as: titleAs
		}, project.name), /* @__PURE__ */ React.createElement("span", { className: "py-muted text-figure" }, period(project.start, project.end))), /* @__PURE__ */ React.createElement(Text, {
			variant: "small",
			tone: "muted"
		}, project.description), /* @__PURE__ */ React.createElement(LinkList, { links: project.links }))));
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
	// src/Section.tsx
	function Section({ title, more, children }) {
		return /* @__PURE__ */ React.createElement("section", { className: "py-section" }, /* @__PURE__ */ React.createElement("div", { className: "py-section-head" }, /* @__PURE__ */ React.createElement(Text, {
			variant: "heading",
			as: "h2"
		}, title), more === void 0 ? null : /* @__PURE__ */ React.createElement("a", {
			className: "text-small",
			href: more.href
		}, more.label)), children);
	}
	// src/SiteFooter.tsx
	function SiteFooter({ name, href, description, groups, copyright }) {
		return /* @__PURE__ */ React.createElement("footer", { className: "py-site-footer" }, /* @__PURE__ */ React.createElement("div", {
			className: "py-site-footer-content",
			"data-theme": "dark"
		}, /* @__PURE__ */ React.createElement("div", { className: "py-site-footer-columns" }, /* @__PURE__ */ React.createElement("div", { className: "py-site-footer-name" }, /* @__PURE__ */ React.createElement(Text, { variant: "heading" }, /* @__PURE__ */ React.createElement("a", {
			className: "py-plain-link",
			href
		}, name)), description === void 0 ? null : /* @__PURE__ */ React.createElement(Text, {
			variant: "small",
			tone: "muted"
		}, description)), /* @__PURE__ */ React.createElement("div", { className: "py-site-footer-groups" }, groups.map((group) => /* @__PURE__ */ React.createElement("div", {
			className: "py-site-footer-group",
			key: group.label
		}, /* @__PURE__ */ React.createElement(Text, {
			variant: "label",
			tone: "muted"
		}, group.label), /* @__PURE__ */ React.createElement(LinkList, {
			links: group.links,
			stacked: true
		}))))), /* @__PURE__ */ React.createElement("p", { className: "py-site-footer-copyright py-text py-muted text-small" }, "© ", copyright.year, " ", copyright.holder)));
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
	// src/TalkFeature.tsx
	function TalkFeature({ talk, slide, titleAs: Title = "h2" }) {
		return /* @__PURE__ */ React.createElement("article", { className: "py-talk-feature" }, /* @__PURE__ */ React.createElement(Picture, {
			image: slide,
			ratio: "16:9"
		}), /* @__PURE__ */ React.createElement("p", { className: "py-talk-feature-when py-text py-muted text-small" }, /* @__PURE__ */ React.createElement("time", { dateTime: talk.date }, fullDate(talk.date)), talk.event === void 0 ? null : /* @__PURE__ */ React.createElement(React.Fragment, null, " · ", /* @__PURE__ */ React.createElement("span", { lang: talk.event.lang }, talk.event.name))), /* @__PURE__ */ React.createElement(Title, {
			className: "py-text py-phrases text-heading",
			lang: talk.lang
		}, talk.title), /* @__PURE__ */ React.createElement(LinkList, { links: talk.links }));
	}
	// src/TalkList.tsx
	function TalkList({ talks, titleAs: Title = "h2" }) {
		return /* @__PURE__ */ React.createElement("ol", { className: "py-talk-list" }, talks.map((talk) => /* @__PURE__ */ React.createElement("li", {
			className: "py-talk",
			key: `${talk.date} ${talk.title}`
		}, /* @__PURE__ */ React.createElement("time", {
			className: "py-talk-date",
			dateTime: talk.date
		}, /* @__PURE__ */ React.createElement("span", { className: "py-muted text-label" }, talk.date.slice(0, 4)), /* @__PURE__ */ React.createElement("span", { className: "py-talk-day text-heading" }, monthDay(talk.date))), /* @__PURE__ */ React.createElement("div", { className: "py-talk-body" }, /* @__PURE__ */ React.createElement(Title, {
			className: "py-text py-phrases text-entry",
			lang: talk.lang
		}, talk.title), talk.event === void 0 ? null : /* @__PURE__ */ React.createElement("p", {
			className: "py-text py-muted text-small",
			lang: talk.event.lang
		}, talk.event.name), /* @__PURE__ */ React.createElement(LinkList, { links: talk.links })))));
	}
	// src/writing-list.ts
	function articlesByYear(articles) {
		return [...Map.groupBy(articles, (article) => article.date.slice(0, 4))].map(([year, ofYear]) => ({
			year,
			articles: ofYear
		}));
	}
	// src/WritingList.tsx
	function Articles({ articles, written }) {
		return /* @__PURE__ */ React.createElement("ul", { className: "py-writing-list" }, articles.map((article) => /* @__PURE__ */ React.createElement("li", {
			className: "py-writing-list-item",
			key: article.href
		}, /* @__PURE__ */ React.createElement("h3", { className: "py-text text-entry" }, /* @__PURE__ */ React.createElement("a", {
			className: "py-plain-link py-phrases",
			href: article.href,
			lang: article.lang
		}, article.title)), /* @__PURE__ */ React.createElement("time", {
			className: "py-muted text-figure",
			dateTime: article.date
		}, written(article.date)))));
	}
	function WritingList({ articles, grouped = false }) {
		if (!grouped) return /* @__PURE__ */ React.createElement(Articles, {
			articles,
			written: fullDate
		});
		return /* @__PURE__ */ React.createElement("div", { className: "py-writing-years" }, articlesByYear(articles).map((group) => /* @__PURE__ */ React.createElement("section", { key: group.year }, /* @__PURE__ */ React.createElement("h2", { className: "py-writing-year py-text py-muted text-label" }, group.year), /* @__PURE__ */ React.createElement(Articles, {
			articles: group.articles,
			written: monthDay
		}))));
	}
	exports.AboutSection = AboutSection;
	exports.CareerList = CareerList;
	exports.IndexList = IndexList;
	exports.Introduction = Introduction;
	exports.LinkCard = LinkCard;
	exports.LinkList = LinkList;
	exports.Page = Page;
	exports.PageHeader = PageHeader;
	exports.Picture = Picture;
	exports.PostIndex = PostIndex;
	exports.ProfileAside = ProfileAside;
	exports.ProfilePage = ProfilePage;
	exports.ProjectGrid = ProjectGrid;
	exports.Prose = Prose;
	exports.SearchField = SearchField;
	exports.SearchResults = SearchResults;
	exports.Section = Section;
	exports.SiteFooter = SiteFooter;
	exports.SiteHeader = SiteHeader;
	exports.TalkFeature = TalkFeature;
	exports.TalkList = TalkList;
	exports.Text = Text;
	exports.WritingList = WritingList;
	exports.fullDate = fullDate;
	return exports;
})({});
