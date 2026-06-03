/**
 * UI store — vanilla pub/sub for two pieces of cross-component UI state
 * that don't belong in the cart data store: the cart drawer's open flag
 * and the "Added to bag" toast.
 *
 * Mirrors the cart-store pattern so it plugs straight into React's
 * `useSyncExternalStore`. Hydration safety: the server snapshot is a
 * reference-stable closed/empty object, so SSR HTML and the first client
 * render are identical (the drawer is closed, no toast) — no mismatch.
 *
 * No timers, Date.now(), or Math.random() touch the initial render. The
 * toast id is a monotonic counter that only ever advances inside an
 * event handler (after mount), never during render.
 */

type Listener = () => void;

// ─── Drawer ────────────────────────────────────────────────────────────
type DrawerState = { open: boolean };

const DRAWER_CLOSED: DrawerState = { open: false };
let drawerState: DrawerState = DRAWER_CLOSED;
const drawerListeners = new Set<Listener>();

function notifyDrawer() {
  for (const l of drawerListeners) l();
}

export const drawerStore = {
  subscribe(listener: Listener): () => void {
    drawerListeners.add(listener);
    return () => drawerListeners.delete(listener);
  },
  getSnapshot(): DrawerState {
    return drawerState;
  },
  getServerSnapshot(): DrawerState {
    return DRAWER_CLOSED;
  },
  open() {
    if (drawerState.open) return;
    drawerState = { open: true };
    notifyDrawer();
  },
  close() {
    if (!drawerState.open) return;
    drawerState = DRAWER_CLOSED;
    notifyDrawer();
  },
  toggle() {
    drawerState = { open: !drawerState.open };
    notifyDrawer();
  },
};

// ─── Toast ─────────────────────────────────────────────────────────────
export type Toast = {
  id: number;
  /** Product name shown in the toast, when known. */
  productName?: string;
};

type ToastState = { toast: Toast | null };

const TOAST_EMPTY: ToastState = { toast: null };
let toastState: ToastState = TOAST_EMPTY;
const toastListeners = new Set<Listener>();
// Monotonic counter — only incremented inside event handlers, never at
// render time, so it can't cause a hydration mismatch.
let toastSeq = 0;

function notifyToast() {
  for (const l of toastListeners) l();
}

export const toastStore = {
  subscribe(listener: Listener): () => void {
    toastListeners.add(listener);
    return () => toastListeners.delete(listener);
  },
  getSnapshot(): ToastState {
    return toastState;
  },
  getServerSnapshot(): ToastState {
    return TOAST_EMPTY;
  },
  show(productName?: string) {
    toastSeq += 1;
    toastState = {
      toast: productName ? { id: toastSeq, productName } : { id: toastSeq },
    };
    notifyToast();
  },
  dismiss() {
    if (!toastState.toast) return;
    toastState = TOAST_EMPTY;
    notifyToast();
  },
};

/**
 * Convenience helper called from add-to-bag handlers (product cards and
 * the PDP). Shows the toast and opens the drawer is intentionally left
 * to the caller — most callers only want the toast.
 */
export function notifyAddedToBag(productName?: string) {
  toastStore.show(productName);
}
