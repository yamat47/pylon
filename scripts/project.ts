// Builds design/project/, the files the copy of the design system on Claude Design is made of,
// from src/ and system/. That page reads them in the shape its type fixes: one classic script
// that assigns window.Pylon, its stylesheet, one index.d.ts, and for each component its guideline
// and a card that draws its stories. The folder is committed, and published as it is by the
// design-publish skill (design/publish.json).
//
// `node scripts/project.ts` writes the folder. With `--check` it leaves the folder alone and
// fails when it is not what the sources build.
import { execFile } from "node:child_process";
import { cp, mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import vm from "node:vm";
import { createElement } from "react";
import { storyNameFromExport } from "storybook/internal/csf";
import { build, createServer, type ViteDevServer } from "vite";
import source from "../system/tokens.json" with { type: "json" };
import { components as listed } from "./components.ts";
import { hostedFamilies } from "./hosted-fonts.ts";
import { cardPage, frameWidth, isRecord, NAMESPACE, readStories, Writer } from "./preview.ts";
import { projectBaseCss, projectTokensCss } from "./tokens-css.ts";

const repo = path.resolve(import.meta.dirname, "..");
const src = path.join(repo, "src");
const system = path.join(repo, "system");
const committed = path.join(repo, "design", "project");

// The cover is a card that no component has, at the place a component of that name would take.
const COVER = "Cover";

// The tokens as the copy carries them: the same, but for the names of the fonts.
const tokens = {
  ...source,
  type: { ...source.type, families: hostedFamilies(source.type.families) },
};

// A length the tokens give in rem, in px at the browser's own font size, which a card is drawn at.
function px(name: string): number {
  const value = source.spacing.tokens.find((token) => token.name === name)?.value;
  if (value === undefined || !value.endsWith("rem")) throw new Error(`no length in rem: ${name}`);
  return Number.parseFloat(value) * 16;
}

// What the package gives a site, as the bundle has to give it to a page: the components, and
// whatever else src/index.ts exports that is not a type, such as how a date is written.
type Library = { readonly names: readonly string[]; readonly others: readonly string[] };

// One script for a page that already has React as a global: the classic JSX transform leaves
// `React.createElement` calls, and nothing is imported.
async function bundle({ names, others }: Library, components: string): Promise<void> {
  const header = { format: 4, namespace: NAMESPACE, components: names.map((name) => ({ name })) };
  await build({
    configFile: false,
    root: repo,
    logLevel: "warn",
    // A production build whatever else runs in this process: the server that reads the stories
    // is a development one, and a development build names each source file by its path here.
    mode: "production",
    oxc: {
      jsx: {
        runtime: "classic",
        development: false,
        pragma: "React.createElement",
        pragmaFrag: "React.Fragment",
      },
    },
    build: {
      outDir: components,
      emptyOutDir: false,
      copyPublicDir: false,
      // Readable, so that a change to the copy can be read in a pull request.
      minify: false,
      lib: {
        entry: path.join(src, "index.ts"),
        name: NAMESPACE,
        formats: ["iife"],
        fileName: () => "bundle.js",
      },
      rolldownOptions: {
        external: ["react", "react-dom"],
        output: {
          globals: { react: "React", "react-dom": "ReactDOM" },
          banner: `/* @ds-bundle: ${JSON.stringify(header)} */`,
        },
      },
    },
  });
  const text = await readFile(path.join(components, "bundle.js"), "utf8");
  if (/<\/script|<!--/i.test(text)) {
    throw new Error("bundle.js holds </script or <!--, which a page cannot inline");
  }
  // The folder has to build the same on every machine, or the check fails wherever it was not
  // built.
  if (text.includes(repo) || text.includes("__source")) {
    throw new Error("bundle.js is a development build, which names this machine's paths");
  }
  // The page runs the bundle as a classic script: `var Pylon` at the top level has to become the
  // page's global, with everything the package exports on it.
  const sandbox: Record<string, unknown> = { React: { createElement() {}, Fragment: {} } };
  vm.runInNewContext(text, sandbox);
  const defined = isRecord(sandbox[NAMESPACE]) ? Object.keys(sandbox[NAMESPACE]) : [];
  const missing = [...names, ...others].filter((name) => !defined.includes(name));
  if (missing.length > 0) throw new Error(`bundle.js does not define ${missing.join(", ")}`);
}

// The components' stylesheet, after what it reads that the copy's tokens.css does not say.
async function stylesheet(components: string): Promise<void> {
  const css = await readFile(path.join(src, "components.css"), "utf8");
  if (/<\/style/i.test(css)) {
    throw new Error("components.css holds </style, which a page cannot inline");
  }
  await writeFile(path.join(components, "bundle.css"), `${projectBaseCss(tokens)}\n${css}`);
}

// One index.d.ts: tsc writes a declaration per source file; this joins them, lifts what they
// import from React to the top, and adds the global the page documents. What a file exports for
// the other files alone is declared without `export`, since the global does not hold it.
async function declarations({ names, others }: Library, components: string): Promise<void> {
  const dir = await mkdtemp(path.join(os.tmpdir(), "pylon-types-"));
  try {
    await promisify(execFile)(
      path.join(repo, "node_modules", ".bin", "tsc"),
      ["-p", "tsconfig.build.json", "--emitDeclarationOnly", "--outDir", dir],
      { cwd: repo },
    );
    const emitted = (await readdir(dir))
      .filter((file) => file.endsWith(".d.ts") && file !== "index.d.ts")
      .map((file) => file.slice(0, -".d.ts".length));
    // What the components share comes first, then the components in their order.
    const shared = emitted.filter((name) => !names.includes(name)).toSorted();
    const given = [...names, ...others];
    const fromReact = new Set<string>();
    const declaredIn = new Map<string, string>();
    const bodies: string[] = [];
    for (const name of [...shared, ...names]) {
      const text = await readFile(path.join(dir, `${name}.d.ts`), "utf8");
      const lines = text.split("\n").flatMap((line) => {
        const react = /^import type \{ ([^}]+) \} from "react";$/.exec(line)?.[1];
        if (react !== undefined) {
          for (const imported of react.split(",")) fromReact.add(imported.trim());
          return [];
        }
        // Another file of this folder: its declarations are in the same index.d.ts.
        if (/^import .* from "\.\//.test(line) || line === "export {};") return [];
        if (/^import\b/.test(line)) throw new Error(`${name}.d.ts: unexpected import: ${line}`);
        const value = /^export declare (?:function|const) (\w+)/.exec(line)?.[1];
        const inner = value !== undefined && !given.includes(value);
        return [inner ? line.slice("export ".length) : line];
      });
      for (const line of lines) {
        const own = /^(?:export )?(?:declare )?(?:type|interface|function|const) (\w+)/.exec(
          line,
        )?.[1];
        if (own === undefined) continue;
        const elsewhere = declaredIn.get(own);
        if (elsewhere !== undefined && elsewhere !== name) {
          throw new Error(
            `${own} is declared in both ${elsewhere} and ${name}; one index.d.ts cannot hold both`,
          );
        }
        declaredIn.set(own, name);
      }
      bodies.push(`// ${name}\n${lines.join("\n").trim()}\n`);
    }
    await writeFile(
      path.join(components, "index.d.ts"),
      [
        "// Generated from src/ by scripts/project.ts: the declarations of every file the package is",
        `// built from, in one. window.${NAMESPACE} holds what the last block lists.`,
        `import type { ${[...fromReact].toSorted().join(", ")} } from "react";`,
        "",
        ...bodies,
        "declare global {",
        "  interface Window {",
        `    ${NAMESPACE}: {`,
        ...given.map((name) => `      ${name}: typeof ${name};`),
        "    };",
        "  }",
        "}",
        "",
      ].join("\n"),
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

// A story file's card, written from its stories' args.
function cardOf(
  module: Record<string, unknown>,
  name: string,
  component: unknown,
  writer: Writer,
): string {
  const where = `src/${name}.stories.tsx`;
  if (typeof component !== "function") {
    throw new Error(`src/index.ts does not export ${name} as a component`);
  }
  const { group, frame, stories } = readStories(module, where);
  const written = stories.map(({ exportName, args }) => ({
    // Storybook's own naming, so that a card calls a story what the sidebar calls it. The entry
    // is one Storybook makes no promise about: a change in it shows as a stale folder.
    title: storyNameFromExport(exportName),
    // The element the story is, which the writer turns into the call that makes it.
    code: writer.js(createElement(component as () => null, args), `${where} ${exportName}`),
  }));
  return cardPage({ name, group, frame, width: frameWidth(frame, px) }, written);
}

// For each component: its guideline as the README, and a card written from its stories. The
// stories are read through Vite, so that their args are the real values, fixtures included.
async function cards(
  { names }: Library,
  library: Record<string, unknown>,
  server: ViteDevServer,
  components: string,
): Promise<void> {
  const writer = new Writer(new Map(names.map((name) => [library[name], name])));
  for (const name of names) {
    const module = await server.ssrLoadModule(`/src/${name}.stories.tsx`);
    const dir = path.join(components, name);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "preview.html"), cardOf(module, name, library[name], writer));
    await cp(path.join(src, `${name}.md`), path.join(dir, "README.md"));
  }
}

// The brand book and the cover as they are, the tokens with the fonts' hosted names, and
// tokens.css in the page's own shape.
async function copies(out: string, components: string): Promise<void> {
  await mkdir(path.join(components, COVER), { recursive: true });
  await writeFile(path.join(out, "tokens.json"), `${JSON.stringify(tokens, null, 2)}\n`);
  await writeFile(path.join(out, "tokens.css"), projectTokensCss(tokens));
  await cp(path.join(system, "README.md"), path.join(out, "README.md"));
  await cp(path.join(system, "cover.html"), path.join(components, COVER, "preview.html"));
}

// Builds the whole folder at `out`, which is new, and says what it is made of.
async function write(out: string): Promise<Library> {
  const { names } = await listed();
  if (names.includes(COVER)) throw new Error(`a component cannot be named ${COVER}`);
  const components = path.join(out, "components");
  await mkdir(components, { recursive: true });
  const server = await createServer({
    configFile: false,
    root: repo,
    logLevel: "warn",
    appType: "custom",
    server: { middlewareMode: true, watch: null, hmr: false, ws: false },
    optimizeDeps: { noDiscovery: true },
  });
  try {
    const library = await server.ssrLoadModule("/src/index.ts");
    const made = { names, others: Object.keys(library).filter((key) => !names.includes(key)) };
    // Each writes files of its own, so none waits for another.
    await Promise.all([
      bundle(made, components),
      stylesheet(components),
      declarations(made, components),
      cards(made, library, server, components),
      copies(out, components),
    ]);
    return made;
  } finally {
    await server.close();
  }
}

// Every file under a folder, by its path below it, less what a system leaves behind (.DS_Store).
async function files(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { recursive: true, withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && !entry.name.startsWith("."))
    .map((entry) => path.relative(dir, path.join(entry.parentPath, entry.name)))
    .toSorted();
}

// The paths at which two folders differ: a file only one of them has, or one whose bytes differ.
async function differences(one: string, other: string): Promise<string[]> {
  const [here, there] = await Promise.all([files(one), files(other)]);
  const differing: string[] = [];
  for (const file of new Set([...here, ...there])) {
    if (!here.includes(file) || !there.includes(file)) {
      differing.push(file);
      continue;
    }
    const a = await readFile(path.join(one, file));
    if (!a.equals(await readFile(path.join(other, file)))) differing.push(file);
  }
  return differing.toSorted();
}

// The folder is built beside the committed one, which is replaced only by a whole build: a story
// the build refuses leaves the committed folder as it was.
const fresh = await mkdtemp(path.join(os.tmpdir(), "pylon-project-"));
try {
  const { names } = await write(fresh);
  if (process.argv.includes("--check")) {
    const stale = await differences(fresh, committed);
    if (stale.length > 0) {
      const list = stale.map((file) => `  ${file}`).join("\n");
      console.error(
        `design/project is not what the sources build (run \`make project\`):\n${list}`,
      );
      process.exitCode = 1;
    }
  } else {
    await rm(committed, { recursive: true, force: true });
    await cp(fresh, committed, { recursive: true });
    console.log(`design/project: ${names.length} components (${names.join(", ")})`);
  }
} finally {
  await rm(fresh, { recursive: true, force: true });
}
