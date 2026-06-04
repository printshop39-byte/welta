/**
 * Wishlist item — a lightweight snapshot of a product saved by the
 * shopper. Like the cart, we store the display fields on the item itself
 * (name/image/price) so /wishlist renders instantly on a fresh tab with
 * no second fetch, and so a product going out of catalogue doesn't blank
 * the saved row.
 */
export type WishlistItem = {
  /** Product id — the stable de-dupe key. */
  id: string;
  slug: string;
  name: string;
  price: number;
  mrp: number;
  image: { url: string; alt: string };
};

export type Wishlist = {
  items: WishlistItem[];
  /** Schema version — bump if the shape ever changes incompatibly. */
  version: 1;
};

export const EMPTY_WISHLIST: Wishlist = { items: [], version: 1 };

export const WISHLIST_STORAGE_KEY = "welta-wishlist";
