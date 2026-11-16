import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import source from "../system/tokens.json" with { type: "json" };

// The families declared by the stylesheets fonts.css imports, in the order it imports them.
async function packaged(): Promise<string[]> {
  const fonts = await readFile(new URL("fonts.css", import.meta.url), "utf8");
  const families = new Set<string>();
  for (const [, specifier] of fonts.matchAll(/@import "([^"]+)";/g)) {
    if (specifier === undefined) continue;
    const css = await readFile(new URL(import.meta.resolve(specifier)), "utf8");
    for (const [, family] of css.matchAll(/font-family: '([^']+)';/g)) {
      if (family !== undefined) families.add(family);
    }
  }
  return [...families];
}

test("the font stack starts with the fonts the package carries, under the names their files give them", async () => {
  const carried = await packaged();
  const stack = source.type.families.sans.split(",").map((name) => name.trim().replaceAll('"', ""));
  assert.notDeepEqual(carried, []);
  assert.deepEqual(stack.slice(0, carried.length), carried);
});
