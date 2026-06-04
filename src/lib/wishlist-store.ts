/**
 * Wishlist store — vanilla pub/sub for React's `useSyncExternalStore`,
 * mirroring the cart store. localStorage-backed, no account needed.
 *
 * Hydration safety (same strategy as the cart):
 *   - `getServerSnapshot()` always returns the same empty wishlist, so
 *     the server HTML and the first client render are identical.
 *   - localStorage is read only after mount, via `ensureClientHydrated()`
 *     called from the hook's effect — never during render.
 */

import {
  EMPTY_WISHLIST,
  WISHLIST_STORAGE_KEY,
  type Wishlist,
  type WishlistItem,
} from "./wishlist-types";

type Listener = () => void;

const SERVER_SNAPSHOT: Wishlist = EMPTY_WISHLIST;

let state: Wishlist = EMPTY_WISHLIST;
const listeners = new Set<Listener>();
let storageBound = false;

function notify() {
  for (const l of listeners) l();
}

function isWishlist(value: unknown): value is Wishlist {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<Wishlist>;
  return v.version === 1 && Array.isArray(v.items);
}

function readFromStorage(): Wishlist {
  if (typeof window === "undefined") return EMPTY_WISHLIST;
  try {
    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return EMPTY_WISHLIST;
    const parsed: unknown = JSON.parse(raw);
    if (!isWishlist(parsed)) return EMPTY_WISHLIST;
    const items: WishlistItem[] = parsed.items.filter(
      (i): i is WishlistItem =>
        !!i && typeof i.id === "string" && typeof i.slug === "string",
    );
    return { version: 1, items };
  } catch {
    return EMPTY_WISHLIST;
  }
}

function writeToStorage(next: Wishlist) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage full / disabled / private mode — keep the in-memory copy.
  }
}

function setWishlist(next: Wishlist) {
  state = next;
  writeToStorage(next);
  notify();
}

/** Initialise from localStorage and bind cross-tab sync. Idempotent. */
export function ensureClientHydrated() {
  if (typeof window === "undefined" || storageBound) return;
  storageBound = true;
  state = readFromStorage();
  notify();
  window.addEventListener("storage", (e) => {
    if (e.key !== WISHLIST_STORAGE_KEY) return;
    state = readFromStorage();
    notify();
  });
}

export const wishlistStore = {
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): Wishlist {
    return state;
  },
  getServerSnapshot(): Wishlist {
    return SERVER_SNAPSHOT;
  },
  has(id: string): boolean {
    return state.items.some((i) => i.id === id);
  },
  add(item: WishlistItem) {
    if (state.items.some((i) => i.id === item.id)) return;
    setWishlist({ ...state, items: [...state.items, item] });
  },
  remove(id: string) {
    setWishlist({ ...state, items: state.items.filter((i) => i.id !== id) });
  },
  /** Add if absent, remove if present. Returns the new wishlisted state. */
  toggle(item: WishlistItem): boolean {
    const exists = state.items.some((i) => i.id === item.id);
    if (exists) {
      this.remove(item.id);
      return false;
    }
    this.add(item);
    return true;
  },
  clear() {
    setWishlist(EMPTY_WISHLIST);
  },
};

export function wishlistCount(wishlist: Wishlist): number {
  return wishlist.items.length;
}
