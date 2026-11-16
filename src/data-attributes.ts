import type { DataAttributes } from "./types.ts";

const isDataName = (name: string): name is `data-${string}` => name.startsWith("data-");

// The `data-*` attributes among what a site handed over, and nothing else. The type already
// refuses the rest, but only where the typecheck sees an object written in place; this is what
// keeps a class, a handler or HTML from reaching an element in a wider object.
export function dataAttributes(given: object | undefined): DataAttributes {
  const kept: { [name: `data-${string}`]: string } = {};
  for (const [name, value] of Object.entries(given ?? {})) {
    if (isDataName(name) && typeof value === "string") kept[name] = value;
  }
  return kept;
}
