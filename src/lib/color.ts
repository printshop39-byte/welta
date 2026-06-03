/**
 * Map a free-text product colour name (from MyBillBook / ORDS imports)
 * to a CSS colour for a small swatch dot.
 *
 * The catalogue stores colours as human words ("Ivory", "Blush",
 * "Navy"), not hex. We normalise the name and look it up in a small
 * brand-aware palette. Unknown colours fall back to a neutral cream so a
 * swatch still renders rather than breaking — the colour name label
 * beside it always carries the real meaning.
 */
const PALETTE: Record<string, string> = {
  ivory: "#FBF7EF",
  cream: "#EFE6D2",
  offwhite: "#F5EFE3",
  white: "#FFFFFF",
  blush: "#E7C9C3",
  pink: "#E59BB0",
  rose: "#D98AA0",
  peach: "#F2C9A0",
  red: "#B23A48",
  maroon: "#6E1E26",
  navy: "#15233F",
  blue: "#2F4A7C",
  skyblue: "#9DB7D8",
  teal: "#1F6F6B",
  green: "#3E6B4F",
  olive: "#6B6A33",
  mint: "#BBD9C2",
  yellow: "#E3C04B",
  mustard: "#C99A2E",
  gold: "#B6892C",
  orange: "#D98A3D",
  rust: "#A8552E",
  brown: "#6E4B2A",
  beige: "#D9C7A6",
  grey: "#8A8A8A",
  gray: "#8A8A8A",
  black: "#1A1A1A",
  charcoal: "#2A2A2A",
  purple: "#6E4A7E",
  lavender: "#BBA9D1",
  lilac: "#C7B2D6",
  wine: "#5E2230",
  turquoise: "#3FA6A0",
  grey1: "#8A8A8A",
};

export function colorToSwatch(name: string): string {
  const key = name.toLowerCase().replace(/[^a-z]/g, "");
  if (PALETTE[key]) return PALETTE[key];
  // Try the first recognised word in a multi-word colour
  // (e.g. "navy georgette" → "navy").
  for (const word of name.toLowerCase().split(/[^a-z]+/)) {
    if (word && PALETTE[word]) return PALETTE[word];
  }
  return "#EFE6D2"; // neutral cream fallback
}
