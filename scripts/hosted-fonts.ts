// The fonts as the copy on Claude Design names them. A site serves the two fonts itself, under
// the names their packages give them. The copy carries no font file: its page fetches a font it
// is only given the name of from Google Fonts, which knows the two by other names.
const HOSTED = {
  "Inter Variable": "Inter",
  "Noto Sans JP Variable": "Noto Sans JP",
} as const;

// The font stacks with each font under its hosted name. A font that no stack names any more is
// refused: the copy would be set in the next font of the stack, and look almost right.
export function hostedFamilies(families: Readonly<Record<string, string>>): Record<string, string> {
  const stacks = Object.values(families);
  for (const served of Object.keys(HOSTED)) {
    if (!stacks.some((stack) => stack.includes(`"${served}"`))) {
      throw new Error(`no font stack names "${served}", so the copy cannot give it a hosted name`);
    }
  }
  return Object.fromEntries(
    Object.entries(families).map(([name, stack]) => [
      name,
      Object.entries(HOSTED).reduce(
        (renamed, [served, hosted]) => renamed.replaceAll(`"${served}"`, `"${hosted}"`),
        stack,
      ),
    ]),
  );
}
