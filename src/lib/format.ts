/**
 * Format a whole-rupee value as INR with Indian grouping (lakh/crore).
 *
 * Why not Intl.NumberFormat('en-IN')?  ICU data can differ between the
 * Node runtime (which prerenders) and the browser runtime (which
 * hydrates).  Even a one-character difference in the output triggers a
 * React hydration mismatch warning on every product card and price
 * label.  This hand-rolled formatter is byte-identical on server and
 * client, removing that whole class of bug.
 */
export function formatINR(value: number): string {
  if (!Number.isFinite(value)) return "₹0";
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "-" : "";
  const digits = Math.abs(rounded).toString();

  // Indian grouping: last 3 digits, then groups of 2.
  // 1234567 -> "12,34,567"
  let grouped: string;
  if (digits.length <= 3) {
    grouped = digits;
  } else {
    const last3 = digits.slice(-3);
    const rest = digits.slice(0, -3);
    const restGrouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    grouped = `${restGrouped},${last3}`;
  }

  return `${sign}₹${grouped}`;
}

export function discountPercent(price: number, mrp: number): number {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
