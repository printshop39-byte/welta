"use client";

import { useSyncExternalStore } from "react";
import { drawerStore, toastStore } from "./ui-store";

/**
 * Subscribe to the cart drawer open flag. Server + first client render
 * both return the closed snapshot, so there's no hydration mismatch.
 */
export function useDrawerOpen(): boolean {
  return useSyncExternalStore(
    drawerStore.subscribe,
    () => drawerStore.getSnapshot().open,
    () => drawerStore.getServerSnapshot().open,
  );
}

/** Subscribe to the current toast (null when none is showing). */
export function useToast() {
  return useSyncExternalStore(
    toastStore.subscribe,
    () => toastStore.getSnapshot().toast,
    () => toastStore.getServerSnapshot().toast,
  );
}
