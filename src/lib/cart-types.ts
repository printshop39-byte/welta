/**
 * Cart line item — persisted to localStorage and rendered in /cart, the
 * WhatsApp handoff message, and the header badge count.
 *
 * Name / image / price are stored on the item itself (not looked up by
 * id at read time) for two reasons:
 *   1. /cart must render instantly on a fresh tab without a second fetch.
 *   2. Prices change. Capturing them at add-time is the honest behaviour
 *      every premium storefront uses.
 */
export type CartItem = {
  /** Stable line-item key — `${productId}::${variantId}`. */
  key: string;
  productId: string;
  productSlug: string;
  productName: string;
  variantId: string;
  variantLabel: string;
  unitPrice: number;
  unitMrp: number;
  image: { url: string; alt: string };
  qty: number;
  /** MyBillBook SKU / Item Code, when the product has one.
   *  Surfaced in the cart UI and the WhatsApp order message so the
   *  atelier team can fulfil from inventory without guessing. */
  sku?: string;
};

export type Cart = {
  items: CartItem[];
  /** Schema version — bump if the shape ever changes incompatibly. */
  version: 1;
};

export const EMPTY_CART: Cart = { items: [], version: 1 };

export const CART_STORAGE_KEY = "welta:cart:v1";

/** Hard cap to prevent runaway qty inputs / pasted-in numbers. */
export const MAX_QTY_PER_LINE = 20;
