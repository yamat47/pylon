// A component's card in the copy of the design system on Claude Design: one small page that draws
// the component's stories with the published bundle. A story is its args, so a card is written
// from them and cannot show a prop the component lacks.
import { Fragment, isValidElement } from "react";

// The global the bundle assigns, which a card reads the components from.
export const NAMESPACE = "Pylon";

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

// How wide a card lays its stories out, whatever the width of the card they are then scaled into.
// A story file says it once, as `parameters.card.frame` on its meta: `text` is a column of text and
// `wide` an index, the two widths a `Page` gives its content, each inside a margin; `page` is a
// whole page in a desktop's window, to the card's edges.
export const FRAMES = ["text", "wide", "page"] as const;
export type Frame = (typeof FRAMES)[number];

// The tokens a frame is made of: the width of each column, and the margin around it.
const COLUMN = { text: "width-measure", wide: "width-page" } as const;
const MARGIN = "space-6";
// A desktop's window, in px.
const WINDOW = 1280;

// The frame a story file asks for, from its meta's `parameters`. `where` names the file in an
// error. Anything else under `parameters.card` is refused, so that a card never ignores a setting.
export function frameOf(parameters: unknown, where: string): Frame {
  const given = isRecord(parameters) ? parameters.card : undefined;
  if (!isRecord(given)) throw new Error(`${where}: no parameters.card on the meta`);
  const { frame, ...others } = given;
  const [other] = Object.keys(others);
  if (other !== undefined) {
    throw new Error(`${where}: parameters.card.${other} is not a card setting`);
  }
  const known = FRAMES.find((candidate) => candidate === frame);
  if (known === undefined) {
    throw new Error(`${where}: parameters.card.frame is not one of ${FRAMES.join(", ")}`);
  }
  return known;
}

// The width in px a frame lays its stories out at. `px` gives a token's length in px.
export function frameWidth(frame: Frame, px: (token: string) => number): number {
  return frame === "page" ? WINDOW : px(COLUMN[frame]) + 2 * px(MARGIN);
}

// What a story file holds, as a card needs it: the group its component is listed under, its
// frame, and each story's args with the meta's under them. `where` names the file in an error.
//
// What a card cannot show is refused and not dropped. A `render` or `decorators` would draw
// something the card never sees, and so would a story that is a function (a story is args only,
// by the repository's own rule). A card setting on one story would frame the others too.
export function readStories(
  module: Record<string, unknown>,
  where: string,
): {
  group: string;
  frame: Frame;
  stories: { exportName: string; args: Record<string, unknown> }[];
} {
  const meta = module.default;
  if (!isRecord(meta) || typeof meta.title !== "string") {
    throw new Error(`${where}: no meta with a title`);
  }
  // The title goes into a comment and an attribute of the card as it is.
  if (/["<>]|--/.test(meta.title)) {
    throw new Error(`${where}: a title with ", <, > or -- cannot be written on a card`);
  }
  const metaArgs = isRecord(meta.args) ? meta.args : {};
  const stories = Object.entries(module).flatMap(([exportName, story]) => {
    if (exportName === "default") return [];
    const at = `${where} ${exportName}`;
    if (!isRecord(story)) throw new Error(`${at}: a story is an object with args`);
    for (const key of ["render", "decorators"]) {
      if (story[key] !== undefined || meta[key] !== undefined) {
        throw new Error(`${at}: a ${key} cannot reach the card; say it in args`);
      }
    }
    if (isRecord(story.parameters) && story.parameters.card !== undefined) {
      throw new Error(`${at}: parameters.card belongs on the meta, for every story of the file`);
    }
    return [{ exportName, args: { ...metaArgs, ...(isRecord(story.args) ? story.args : {}) } }];
  });
  if (stories.length === 0) throw new Error(`${where}: no story`);
  const [group = meta.title] = meta.title.split("/");
  return { group, frame: frameOf(meta.parameters, where), stories };
}

// Writes a story's args as the JavaScript of a card: a plain value as it is, a React element as
// the `createElement` call that makes it. `components` names the design system's components, by
// which an element of one is written as `P.<name>`; an element of anything else is refused.
export class Writer {
  readonly #components: ReadonlyMap<unknown, string>;

  constructor(components: ReadonlyMap<unknown, string>) {
    this.#components = components;
  }

  js(value: unknown, where: string): string {
    if (value === undefined) return "undefined";
    if (value === null) return "null";
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      // `<` as an escape, so that no text can close the card's <script> or open a comment in it.
      return JSON.stringify(value).replaceAll("<", "\\u003c");
    }
    if (Array.isArray(value)) {
      return `[${value.map((item, at) => this.js(item, `${where}[${at}]`)).join(", ")}]`;
    }
    if (isValidElement<Record<string, unknown>>(value)) {
      const { children, ...props } = value.props;
      const keyed = value.key === null ? props : { key: value.key, ...props };
      // The children as arguments, as JSX passes them.
      const list = children === undefined ? [] : Array.isArray(children) ? children : [children];
      const args = [
        Object.keys(keyed).length === 0 ? "null" : this.js(keyed, where),
        ...list.map((child: unknown, at) => this.js(child, `${where}>${at}`)),
      ];
      return `h(${this.#tag(value.type, where)}, ${args.join(", ")})`;
    }
    if (!isRecord(value) || Object.getPrototypeOf(value) !== Object.prototype) {
      throw new Error(`${where}: a card cannot carry a ${typeof value}`);
    }
    const entries = Object.entries(value).map(
      ([key, item]) => `${this.js(key, where)}: ${this.js(item, `${where}.${key}`)}`,
    );
    return entries.length === 0 ? "{}" : `{ ${entries.join(", ")} }`;
  }

  #tag(type: unknown, where: string): string {
    if (type === Fragment) return "React.Fragment";
    if (typeof type === "string") return JSON.stringify(type);
    const name = this.#components.get(type);
    if (name === undefined) {
      const shown = typeof type === "function" ? type.name : String(type);
      throw new Error(`${where}: <${shown}> is not a design component, so a card cannot draw it`);
    }
    return `P.${name}`;
  }
}

export type Story = {
  // The story's name, as Storybook shows it.
  readonly title: string;
  // The expression that draws it.
  readonly code: string;
};

// The card's page. Its first line is the marker the design system's page reads: the group the
// component is listed under, the width to lay the card out at, and the stories it shows. The page
// already holds the tokens, the stylesheet, React and the bundle when this runs.
export function cardPage(
  { name, group, frame, width }: { name: string; group: string; frame: Frame; width: number },
  stories: readonly Story[],
): string {
  const subtitle = stories.map((story) => story.title).join(", ");
  const margin = frame === "page" ? "" : ` padding: var(--${MARGIN});`;
  return [
    `<!-- @dsCard group="${group}" width=${width} subtitle="${subtitle}" -->`,
    "<!doctype html>",
    // The sites are in Japanese, and the browser breaks lines by the page's language.
    '<html lang="ja">',
    "<head>",
    '<meta charset="utf-8">',
    `<title>${name}</title>`,
    // One story under another, apart by more than anything inside a story is.
    `<style>#root { display: grid; gap: var(--space-12);${margin} } #root > div { min-width: 0; }</style>`,
    "</head>",
    "<body>",
    '<div id="root"></div>',
    "<script>",
    // Said again here, because the page may draw a card inside a document of its own.
    'document.documentElement.lang = "ja";',
    `var P = window.${NAMESPACE}, h = React.createElement;`,
    'ReactDOM.createRoot(document.getElementById("root")).render(',
    "  h(React.Fragment, null,",
    `    ${stories.map((story) => `h("div", null, ${story.code})`).join(",\n    ")}`,
    "  )",
    ");",
    "</script>",
    "</body>",
    "</html>",
    "",
  ].join("\n");
}
