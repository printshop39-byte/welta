/**
 * Cart store — vanilla pub/sub designed for React's `useSyncExternalStore`.
 *
 * Hydration safety strategy:
 *   - `getServerSnapshot()` always returns the same empty cart object.
 *     This guarantees the server-rendered HTML is identical to the
 *     first client render before localStorage is read.
 *   - `getSnapshot()` returns the current cart on the client (which is
 *     empty during the very first paint, then becomes the persisted
 *     cart after the first effect runs via `loadFromStorage()`).
 *   - Subscribers are notified on every mutation AND once on initial
 *     localStorage hydration so the UI re-renders with persisted items.
 *
 * Why not Zustand or jotai?  This codebase already has zero state
 * libraries — adding one for cart-only state is overkill. ~80 lines of
 * vanilla code beats a 5KB+ dep for the same outcome.
 */

import {
  CART_STORAGE_KEY,
  EMPTY_CART,
  MAX_QTY_PER_LINE,
  type Cart,
  type CartItem,
} from "./cart-types";

type Listener = () => void;

// Server snapshot must be reference-stable — React compares with Object.is.
const SERVER_SNAPSHOT: Cart = EMPTY_CART;

let state: Cart = EMPTY_CART;
const listeners = new Set<Listener>();
let storageBound = false;

function notify() {
  for (const l of listeners) l();
}

function isCart(value: unknown): value is Cart {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<Cart>;
  return v.version === 1 && Array.isArray(v.items);
}

function readFromStorage(): Cart {
  if (typeof window === "undefined") return EMPTY_CART;
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return EMPTY_CART;
    const parsed: unknown = JSON.parse(raw);
    if (!isCart(parsed)) return EMPTY_CART;
    // Defensive: clamp qty and drop malformed rows so a corrupted
    // storage entry can't crash render.
    const items: CartItem[] = parsed.items
      .filter(
        (i): i is CartItem =>
          !!i &&
          typeof i.key === "string" &&
          typeof i.productId === "string" &&
          typeof i.qty === "number",
      )
      .map((i) => ({
        ...i,
        qty: Math.max(1, Math.min(MAX_QTY_PER_LINE, Math.floor(i.qty))),
      }));
    return { version: 1, items };
  } catch {
    return EMPTY_CART;
  }
}

function writeToStorage(next: Cart) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage may be full, disabled, or blocked (Safari private mode).
    // Failing silently keeps the in-memory cart usable for the session.
  }
}

function setCart(next: Cart) {
  state = next;
  writeToStorage(next);
  notify();
}

/**
 * Initialise from localStorage and bind cross-tab sync. Called from the
 * `useCart` hook on its first mount on the client. Idempotent.
 */
export function ensureClientHydrated() {
  if (typeof window === "undefined" || storageBound) return;
  storageBound = true;
  state = readFromStorage();
  notify();
  window.addEventListener("storage", (e) => {
    if (e.key !== CART_STORAGE_KEY) return;
    // Another tab mutated the cart — refresh ours and re-render.
    state = readFromStorage();
    notify();
  });
}

export const cartStore = {
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): Cart {
    return state;
  },
  getServerSnapshot(): Cart {
    return SERVER_SNAPSHOT;
  },
  addItem(item: Omit<CartItem, "qty"> & { qty?: number }) {
    const qty = Math.max(1, Math.min(MAX_QTY_PER_LINE, item.qty ?? 1));
    const existing = state.items.find((i) => i.key === item.key);
    const items = existing
      ? state.items.map((i) =>
          i.key === item.key
            ? { ...i, qty: Math.min(MAX_QTY_PER_LINE, i.qty + qty) }
            : i,
        )
      : [...state.items, { ...item, qty }];
    setCart({ ...state, items });
  },
  updateQty(key: string, qty: number) {
    if (qty <= 0) {
      this.removeItem(key);
      return;
    }
    const clamped = Math.min(MAX_QTY_PER_LINE, Math.floor(qty));
    const items = state.items.map((i) =>
      i.key === key ? { ...i, qty: clamped } : i,
    );
    setCart({ ...state, items });
  },
  removeItem(key: string) {
    const items = state.items.filter((i) => i.key !== key);
    setCart({ ...state, items });
  },
  clear() {
    setCart(EMPTY_CART);
  },
};

export function lineItemTotal(item: CartItem): number {
  return item.unitPrice * item.qty;
}

export function cartSubtotal(cart: Cart): number {
  return cart.items.reduce((sum, i) => sum + lineItemTotal(i), 0);
}

export function cartCount(cart: Cart): number {
  return cart.items.reduce((sum, i) => sum + i.qty, 0);
}
