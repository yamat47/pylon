// What makes a file in src/ a component of the design system (index.ts says the same).
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { test } from "node:test";

const files = await readdir(import.meta.dirname);

// A component is a .tsx file named with a capital, less its stories.
const components = files
  .filter((file) => /^[A-Z]\w*\.tsx$/.test(file))
  .map((file) => file.slice(0, -".tsx".length));

test("there are components to check", () => {
  assert.notDeepEqual(components, []);
});

test("every component has a guideline and stories beside it", () => {
  const missing = components.flatMap((name) =>
    [`${name}.md`, `${name}.stories.tsx`].filter((file) => !files.includes(file)),
  );
  assert.deepEqual(missing, []);
});

test("every component is exported from the package", async () => {
  const index = await readFile(new URL("index.ts", import.meta.url), "utf8");
  const hidden = components.filter(
    (name) =>
      !new RegExp(`export \\{[^}]*\\b${name}\\b[^}]*\\} from "\\./${name}\\.tsx";`).test(index),
  );
  assert.deepEqual(hidden, []);
});
