// Which files of src/ are components of the design system: a .tsx file named with a capital,
// less its stories. src/index.test.ts holds every one of them to a guideline, stories and an
// export; scripts/project.ts gives every one a card in the copy on Claude Design.
import { readdir } from "node:fs/promises";

const SRC = new URL("../src/", import.meta.url);

// The components by name, in the order of their files, with every file of src/.
export async function components(): Promise<{ names: string[]; files: string[] }> {
  const files = (await readdir(SRC)).toSorted();
  const names = files
    .filter((file) => /^[A-Z]\w*\.tsx$/.test(file))
    .map((file) => file.slice(0, -".tsx".length));
  return { names, files };
}
