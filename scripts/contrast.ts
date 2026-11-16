// The contrast ratio of two colors as WCAG 2 defines it, from 1 (the same) to 21 (black on white).
// https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio

// One channel of sRGB, 0 to 255, as linear light.
const linear = (channel: number) => {
  const share = channel / 255;
  return share <= 0.04045 ? share / 12.92 : ((share + 0.055) / 1.055) ** 2.4;
};

// The relative luminance of a color written as #rrggbb.
function luminance(hex: string): number {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) throw new Error(`not a #rrggbb color: ${hex}`);
  const rgb = Number.parseInt(hex.slice(1), 16);
  return (
    0.2126 * linear(rgb >> 16) + 0.7152 * linear((rgb >> 8) & 255) + 0.0722 * linear(rgb & 255)
  );
}

export function contrast(one: string, other: string): number {
  const [a, b] = [luminance(one), luminance(other)];
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
