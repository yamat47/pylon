// What the stories show: the blog's own names, links and posts, and the portfolio's in English and
// Japanese, so that a component is looked at with the text it will carry.
import type { IndexedPost } from "./post-index.ts";
import type { Company, LinkGroup, LinkItem, Project, Talk } from "./types.ts";
import type { Article } from "./writing-list.ts";

export const site = {
  name: "blog.yamat47.me",
  href: "/",
  description: "Notes by yamat47",
};

export const nav: readonly LinkItem[] = [{ label: "検索", href: "/search" }];

export const footerLinks: readonly LinkItem[] = [
  { label: "プライバシーポリシー", href: "/privacy" },
];

const github = { label: "GitHub", href: "https://github.com/yamat47" };
const x = { label: "X", href: "https://x.com/yamat47" };
const blogHome = "https://blog.yamat47.me/";
const portfolioHome = "https://me.yamat47.me/";

// The blog's footer: its pages, and where else its author is.
export const blogFooter = {
  name: site.name,
  href: site.href,
  groups: [
    { label: "サイト", links: [...nav, ...footerLinks] },
    { label: "リンク", links: [{ label: "me.yamat47.me", href: portfolioHome }, x, github] },
  ],
  copyright: { year: 2026, holder: "山口 拓弥" },
};

// A post a search finds (the search fixture below).
export const postmortems: IndexedPost = {
  date: "2025-09-18",
  href: "/entry/2025/09/18/083019",
  title: "ポストモーテムを意味のあるものにするには？",
};

// The post whose text the stories of a post show (fixture-texts.tsx).
export const splittingStories: IndexedPost = {
  date: "2025-02-13",
  href: "/entry/2025/02/13/192603",
  title: "開発のストーリー分割・タスク分割をするときに考えていること",
};

export const posts: readonly IndexedPost[] = [
  { date: "2026-01-01", href: "/entry/2026/01/01/130022", title: "2025年を振り返ってみる" },
  {
    date: "2025-10-14",
    href: "/entry/2025/10/14/220005",
    title: "「絶不調」がつづいていたら気をつけろ、と伝えている",
  },
  postmortems,
  {
    date: "2025-09-07",
    href: "/entry/2025/09/07/194400",
    title: "『龍が如く』のナンバリングを全部プレーした or 実況を観た",
  },
  { date: "2025-04-14", href: "/entry/2025/04/14/074406", title: "結婚をして、式を挙げた" },
  splittingStories,
  { date: "2024-12-31", href: "/entry/2024/12/31/174853", title: "2024年を振り返ってみる" },
  {
    date: "2022-12-31",
    href: "/entry/2022/12/31/165912",
    title: "2022年を振り返ってみる（仕事、アメフト、Netflix、推し活、...）",
  },
  { date: "2022-11-11", href: "/entry/2022/11/11/204028", title: "クラッソーネを退職しました" },
];

// A grey picture, standing in for a photograph or a thumbnail.
export const picture =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='960' height='320'%3E%3Crect width='100%25' height='100%25' fill='%23bdbdbd'/%3E%3C/svg%3E";

// Another, darker and of another shape, for a second photograph beside the first.
export const photo =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='100%25' height='100%25' fill='%239e9e9e'/%3E%3C/svg%3E";

// The page one of the posts links to, as a link card shows it.
export const linkedPage = {
  href: "https://nikkie-ftnext.hatenablog.com/entry/how-to-split-user-stories-not-split-into-tasks-202305",
  title: "ユーザストーリーをタスクに分解しないための考え方をさがして - nikkie-ftnextの日記",
  description:
    "はじめに 親父...1 nikkieです。 ユーザストーリーの分割について、いくつかの書籍に渡ったつながりを発見しました！ 現時点のバックアップとしてアウトプットします。",
  site: "nikkie-ftnextの日記",
};

// The blog's privacy policy: a page with a title and no date.
export const privacy = {
  title: "プライバシーポリシー",
  heading: "アクセス解析について",
  text: "当サイトでは、Google によるアクセス解析ツール「Google アナリティクス」を使用しています。Google アナリティクスは、データの収集のために Cookie を使用しています。このデータは匿名で収集されており、個人を特定するものではありません。",
};

// The search page: what it is called, and what a search for one word found in two posts. The
// words around a match are a post's own; Pagefind marks the match and cuts the text with an
// ellipsis.
export const search = {
  title: "検索",
  field: { id: "search-input", name: "q", label: "検索する言葉", placeholder: "記事を検索" },
  results: {
    statusId: "search-status",
    listId: "search-results",
    withoutScript: "検索には JavaScript が必要です。",
  },
  status: "2件の記事が見つかりました。",
  nothing: "「アジャイル」を含む記事は見つかりませんでした。",
  found: [
    {
      post: postmortems,
      before: "インシデント後のポストモーテムを実施するとき、再発防止策まで",
      match: "考え",
      after: "て満足するのは危険。「その対策を講じていたら本当に発生しなかったのか？」…",
    },
    {
      post: splittingStories,
      before: "…需要があるかもと思い、自分が普段",
      match: "考え",
      after: "ていることをメモしてみます。 前提 カンバン方式で開発をしています。…",
    },
  ],
};

// The portfolio: English at /, Japanese at /ja/.

const PAGES = ["about", "projects", "talks", "writing", "career"] as const;
type PortfolioPage = (typeof PAGES)[number];

// The site's pages in one language, with the one the reader is on marked.
const pagesIn =
  (base: string, titles: Readonly<Record<PortfolioPage, string>>) =>
  (current?: PortfolioPage): LinkItem[] =>
    PAGES.map((page) => ({
      label: titles[page],
      href: `${base}${page}/`,
      current: page === current,
    }));

const repository = (name: string, owner = "yamat47") => `https://github.com/${owner}/${name}`;

// What a project is in either language but its description and the labels of its links.
const projectsIn = (
  labels: { readonly code: string; readonly package: string },
  descriptions: readonly [string, string, string, string, string, string, string, string],
): Project[] => {
  const code = (name: string, owner?: string) => ({
    label: labels.code,
    href: repository(name, owner),
  });
  const made = [
    {
      name: "japanese_address_parser",
      start: "2021",
      links: [
        code("japanese_address_parser"),
        { label: "RubyGems", href: "https://rubygems.org/gems/japanese_address_parser" },
      ],
    },
    {
      name: "playmaker",
      start: "2025",
      links: [
        code("playmaker"),
        { label: labels.package, href: "https://www.npmjs.com/package/@yamat47/playmaker" },
      ],
    },
    {
      name: "activerecord_accessible_json",
      start: "2021",
      end: "2021",
      links: [code("activerecord_accessible_json")],
    },
    { name: "JPFF East Filmroom", start: "2026", end: "2026", links: [code("jpff-east-filmroom")] },
    { name: "cutups", start: "2026", end: "2026", links: [code("cutups")] },
    {
      name: "Rails Active Search demo",
      start: "2026",
      end: "2026",
      links: [code("rails-active-search-sqlite-demo")],
    },
    { name: "Word Counter", start: "2025", end: "2025", links: [code("word-counter")] },
    { name: "annotaterb", start: "2025", end: "2025", links: [code("annotaterb", "drwl")] },
  ];
  return made.map((project, at) => ({ ...project, description: descriptions[at] ?? "" }));
};

// The blog's posts, as the portfolio lists them.
const onTheBlog = (lang?: string): Article[] =>
  posts.map((post) => ({ ...post, href: new URL(post.href, blogHome).href, lang }));

const en = {
  profile: {
    name: "Takuya Yamaguchi",
    href: "/",
    description: "Executive Officer and Head of Product Development at ONE CAREER Inc.",
    links: [x, github],
    language: { label: "日本語", href: "/ja/", lang: "ja" },
  },
  titles: {
    about: "About",
    projects: "Projects",
    talks: "Talks",
    writing: "Writing",
    career: "Career",
  },
  pages: pagesIn("/", {
    about: "About",
    projects: "Projects",
    talks: "Talks",
    writing: "Writing",
    career: "Career",
  }),
  footer(current?: PortfolioPage) {
    const groups: LinkGroup[] = [
      { label: "Site", links: this.pages(current) },
      { label: "Links", links: [x, github, { label: "Blog", href: blogHome }] },
      {
        label: "Language",
        links: [
          { label: "English", href: "/", current: true },
          { label: "日本語", href: "/ja/", lang: "ja" },
        ],
      },
    ];
    return {
      name: this.profile.name,
      href: this.profile.href,
      description: this.profile.description,
      groups,
      copyright: { year: 2026, holder: "Takuya Yamaguchi" },
    };
  },
  top: {
    introduction:
      "I lead a product organization of about 50 engineers, designers and product managers across 12 teams at ONE CAREER Inc. in Tokyo. I started out as a Ruby on Rails engineer, moved into engineering management, and now spend most of my time on product strategy and company-wide decisions. I still write open source on the side.",
    more: { label: "More about me", href: "/about/" },
    projects: { title: "Projects", more: { label: "All 8 projects", href: "/projects/" } },
    talks: { title: "Talks", more: { label: "All 9 talks", href: "/talks/" } },
    writing: { title: "Writing", more: { label: "All 31 articles", href: "/writing/" } },
    career: { title: "Career", more: { label: "Career in detail", href: "/career/" } },
    contact: {
      title: "Contact",
      text: "I'm happy to hear about speaking invitations, questions on hiring and building engineering organizations, and technical advising.",
    },
  },
  projects: projectsIn({ code: "GitHub", package: "npm" }, [
    "Ruby gem that normalizes Japanese addresses. More than 260,000 downloads on RubyGems.",
    "TypeScript library for drawing and editing American football play diagrams.",
    "Ruby gem that lets ActiveRecord's JSON attributes be read with string or symbol keys.",
    "Unofficial fan site that arranges the game videos of the J.P.F.F East YouTube channel by season, team and game type.",
    "Football game film clips from Instagram and X, organized by formation, motion and scheme.",
    "Rails Active Search on SQLite FTS5: the Rails Guides searched with three tokenizers, running in the browser on ruby.wasm.",
    "Counts words and characters as you type. The text never leaves the browser.",
    "Contributor: the --nested-position option and position_in_class: after_doc.",
  ]),
  talks: [
    {
      title: "Now that AI has taken over management, how can engineering managers create value?",
      date: "2026-05-07",
      event: { name: "EM Meetup #20" },
      links: [
        { label: "Slides", href: "/talks/2026-05-07/slides" },
        { label: "Event", href: "/talks/2026-05-07/event" },
      ],
    },
    {
      title: "The role and development of engineering managers at ONE CAREER",
      date: "2025-10-20",
      links: [{ label: "Slides", href: "/talks/2025-10-20/slides" }],
    },
    {
      title: 'From "development productivity" to "business productivity"',
      date: "2025-07-03",
      event: { name: "Development Productivity Conference 2025" },
      links: [
        { label: "Slides", href: "/talks/2025-07-03/slides" },
        { label: "Video", href: "/talks/2025-07-03/video" },
        { label: "Event", href: "/talks/2025-07-03/event" },
      ],
    },
    {
      title: "Operating one database shared by several Rails API servers",
      date: "2025-06-25",
      event: { name: "プロダクト成長を支える技術選定と開発文化 〜現場の知見LT大会〜", lang: "ja" },
      links: [
        { label: "Slides", href: "/talks/2025-06-25/slides" },
        { label: "Event", href: "/talks/2025-06-25/event" },
      ],
    },
    {
      title: "“Good First Issue” - “First” = ?",
      date: "2024-09-20",
      event: { name: "D-Plus Tokyo #6" },
      links: [
        { label: "Slides", href: "/talks/2024-09-20/slides" },
        { label: "Event", href: "/talks/2024-09-20/event" },
      ],
    },
  ] as const satisfies readonly [Talk, ...Talk[]],
  articles: onTheBlog("ja"),
  companies: [
    {
      name: "ONE CAREER Inc.",
      roles: [
        {
          title: "Executive Officer",
          start: "2026-04",
          text: "Joined the executive team while continuing to head Product Development. Most of my time goes to product strategy and company-wide decisions.",
        },
        {
          title: "Head of Product Development",
          start: "2025-05",
          text: "Head of a newly formed department that brings engineers, designers and product managers together: about 50 people in 12 teams, solving business problems through product development.",
        },
        {
          title: "Senior Engineering Manager",
          start: "2024-01",
          end: "2025-04",
          text: "Managed the four development teams of the new-graduate business, about 25 people, some of them through their managers.",
        },
        {
          title: "Software Engineer",
          start: "2022-12",
          end: "2023-06",
          text: "Developed and maintained ONE CAREER. Upgraded Ruby from 2.5 to 3.2 and Rails from 6.0 to 7.1, and introduced feature flags for safer releases.",
        },
      ],
    },
    {
      name: "CRASSONE Inc.",
      roles: [
        {
          title: "Product Manager",
          start: "2022-04",
          end: "2022-10",
          text: "Analysed where the business was held back, interviewed users, and led projects across departments.",
        },
        {
          title: "Software Engineer",
          start: "2020-06",
          end: "2022-03",
          text: "Developed the demolition-work matching service CRASSONE: electronic contracts inside the app, real-time messaging, and a release per pull request.",
        },
      ],
    },
    {
      name: "Live Revolution Co., Ltd.",
      roles: [
        {
          title: "Software Engineer",
          start: "2016-04",
          end: "2020-05",
          text: "Developed and maintained the company's internal business systems on Ruby on Rails.",
        },
      ],
    },
  ] as const satisfies readonly Company[],
  about: {
    introduction:
      "I'm Takuya Yamaguchi. I lead a product organization at ONE CAREER Inc. in Tokyo, write open source on the side, and coach American football.",
    photo: "A photo of Takuya Yamaguchi",
    sections: [
      {
        title: "Work",
        text: "I started out in 2016 as a Ruby on Rails engineer at Live Revolution, building the company's internal business systems. At CRASSONE I moved from engineering into product management. Since joining ONE CAREER in 2022 I have gone from software engineer to engineering manager, head of Product Development and, in 2026, executive officer.",
        links: [{ label: "Career in detail", href: "/career/" }],
      },
      {
        title: "Open source",
        text: "I still write code outside my job. japanese_address_parser, a Ruby gem that normalizes Japanese addresses, has been downloaded more than 260,000 times on RubyGems, and I contribute to tools I use, such as annotaterb.",
        links: [{ label: "Projects", href: "/projects/" }],
      },
      {
        title: "American football",
        text: "I coach American football, and several of my side projects come from it: playmaker draws and edits play diagrams, and JPFF East Filmroom and cutups put game film in order.",
        links: [
          { label: "playmaker", href: repository("playmaker") },
          { label: "JPFF East Filmroom", href: repository("jpff-east-filmroom") },
          { label: "cutups", href: repository("cutups") },
        ],
      },
      {
        title: "Games",
        text: "I have played every numbered Yakuza game, or at least watched someone else play it.",
        links: [
          {
            label: "『龍が如く』のナンバリングを全部プレーした or 実況を観た",
            href: new URL("/entry/2025/09/07/194400", blogHome).href,
            lang: "ja",
          },
        ],
      },
    ],
  },
} as const;

const ja = {
  profile: {
    name: "山口 拓弥",
    href: "/ja/",
    description: "株式会社ワンキャリア 執行役員 / プロダクト開発部 部長",
    links: [x, github],
    language: { label: "English", href: "/", lang: "en" },
  },
  titles: {
    about: "自己紹介",
    projects: "プロジェクト",
    talks: "登壇",
    writing: "執筆",
    career: "経歴",
  },
  pages: pagesIn("/ja/", {
    about: "自己紹介",
    projects: "プロジェクト",
    talks: "登壇",
    writing: "執筆",
    career: "経歴",
  }),
  footer(current?: PortfolioPage) {
    const groups: LinkGroup[] = [
      { label: "サイト", links: this.pages(current) },
      { label: "リンク", links: [x, github, { label: "ブログ", href: blogHome }] },
      {
        label: "言語",
        links: [
          { label: "English", href: "/", lang: "en" },
          { label: "日本語", href: "/ja/", current: true },
        ],
      },
    ];
    return {
      name: this.profile.name,
      href: this.profile.href,
      description: this.profile.description,
      groups,
      copyright: { year: 2026, holder: "山口 拓弥" },
    };
  },
  top: {
    introduction:
      "東京のワンキャリアで、エンジニア・デザイナー・プロダクトマネージャーあわせて約50名、12チームのプロダクト組織を率いています。Ruby on Rails のエンジニアとしてキャリアを始め、エンジニアリングマネジメントを経て、いまはプロダクト戦略と全社の意思決定に多くの時間を使っています。個人ではオープンソースの開発も続けています。",
    more: { label: "くわしい自己紹介", href: "/ja/about/" },
    projects: { title: "プロジェクト", more: { label: "プロジェクト一覧", href: "/ja/projects/" } },
    talks: { title: "登壇", more: { label: "登壇一覧", href: "/ja/talks/" } },
    writing: { title: "執筆", more: { label: "執筆一覧", href: "/ja/writing/" } },
    career: { title: "経歴", more: { label: "くわしい経歴", href: "/ja/career/" } },
    contact: {
      title: "連絡先",
      text: "登壇のご依頼、採用やエンジニア組織づくりについてのご相談、技術顧問のお話をお待ちしています。",
    },
  },
  projects: projectsIn({ code: "GitHub", package: "npm" }, [
    "日本の住所を正規化する Ruby gem。RubyGems で26万回以上ダウンロードされています。",
    "アメリカンフットボールのプレー図を描いて編集するための TypeScript ライブラリ。",
    "ActiveRecord の JSON 属性を、文字列でもシンボルでも読めるようにする Ruby gem。",
    "J.P.F.F East の YouTube チャンネルにある試合動画を、シーズン・チーム・試合種別で整理した非公式ファンサイト。",
    "Instagram と X に上がっているアメフトの試合映像を、フォーメーション・モーション・スキームで整理したサイト。",
    "SQLite FTS5 で動く Rails Active Search。Rails ガイドを3つのトークナイザで検索でき、ruby.wasm でブラウザの中で動きます。",
    "入力したそばから単語と文字を数えます。テキストはブラウザの外に出ません。",
    "コントリビュート：--nested-position オプションと position_in_class: after_doc。",
  ]),
  talks: [
    {
      title: "AIがマネジメントを奪った今、EMは何で価値を生むのか？",
      date: "2026-05-07",
      event: { name: "EM Meetup #20", lang: "en" },
      links: [
        { label: "スライド", href: "/ja/talks/2026-05-07/slides" },
        { label: "イベント", href: "/ja/talks/2026-05-07/event" },
      ],
    },
    {
      title: "ワンキャリアにおけるEMの役割と育て方",
      date: "2025-10-20",
      links: [{ label: "スライド", href: "/ja/talks/2025-10-20/slides" }],
    },
    {
      title: "「開発生産性」ではなく、事業の投資対効果に向き合う「事業生産性」へ",
      date: "2025-07-03",
      event: { name: "開発生産性Conference 2025" },
      links: [
        { label: "スライド", href: "/ja/talks/2025-07-03/slides" },
        { label: "動画", href: "/ja/talks/2025-07-03/video" },
        { label: "イベント", href: "/ja/talks/2025-07-03/event" },
      ],
    },
    {
      title: "ワンキャリアにおける複数 Rails API サーバーの共通データベース運用事例",
      date: "2025-06-25",
      event: { name: "プロダクト成長を支える技術選定と開発文化 〜現場の知見LT大会〜" },
      links: [
        { label: "スライド", href: "/ja/talks/2025-06-25/slides" },
        { label: "イベント", href: "/ja/talks/2025-06-25/event" },
      ],
    },
    {
      title: "“Good First Issue” - “First” = ?",
      lang: "en",
      date: "2024-09-20",
      event: { name: "D-Plus Tokyo #6", lang: "en" },
      links: [
        { label: "スライド", href: "/ja/talks/2024-09-20/slides" },
        { label: "イベント", href: "/ja/talks/2024-09-20/event" },
      ],
    },
  ] as const satisfies readonly [Talk, ...Talk[]],
  articles: onTheBlog(),
  companies: [
    {
      name: "株式会社ワンキャリア",
      roles: [
        {
          title: "執行役員",
          start: "2026-04",
          text: "プロダクト開発部の部長を兼任しながら、執行役員を務めています。プロダクト戦略と全社の意思決定に多くの時間を使っています。",
        },
        {
          title: "プロダクト開発部 部長",
          start: "2025-05",
          text: "新設されたプロダクト開発部の部長。エンジニア・デザイナー・プロダクトマネージャーあわせて約50名、12チームで、プロダクト開発による事業課題の解決に取り組んでいます。",
        },
        {
          title: "シニアエンジニアリングマネージャー",
          start: "2024-01",
          end: "2025-04",
          text: "新卒事業に携わる4つの開発チーム（約25名）を、一部はマネージャーを介してマネジメントしました。",
        },
        {
          title: "ソフトウェアエンジニア",
          start: "2022-12",
          end: "2023-06",
          text: "「ONE CAREER」の開発と保守を担当しました。Ruby 2.5 から 3.2、Rails 6.0 から 7.1 へのバージョンアップと、安全なリリースのための Feature Flags の導入を行いました。",
        },
      ],
    },
    {
      name: "株式会社クラッソーネ",
      roles: [
        {
          title: "プロダクトマネージャー",
          start: "2022-04",
          end: "2022-10",
          text: "事業上のボトルネックの分析、ユーザーインタビュー、部署をまたぐプロジェクトの推進を担当しました。",
        },
        {
          title: "ソフトウェアエンジニア",
          start: "2020-06",
          end: "2022-03",
          text: "解体工事のマッチングサービス「クラッソーネ」を開発しました。アプリ内の電子契約、リアルタイムメッセージ、プルリクエスト単位のリリースへの移行などを担当しました。",
        },
      ],
    },
    {
      name: "株式会社ライブレボリューション",
      roles: [
        {
          title: "ソフトウェアエンジニア",
          start: "2016-04",
          end: "2020-05",
          text: "Ruby on Rails による社内の業務管理・支援システムを開発・保守しました。",
        },
      ],
    },
  ] as const satisfies readonly Company[],
} as const;

export const portfolio = { en, ja };
