// Writes src/tokens.css from system/tokens.json. A test (tokens.test.ts) fails when the committed
// file is not what this writes.
import { writeFile } from "node:fs/promises";
import source from "../system/tokens.json" with { type: "json" };
import { tokensCss } from "./tokens-css.ts";

await writeFile(new URL("../src/tokens.css", import.meta.url), tokensCss(source));
