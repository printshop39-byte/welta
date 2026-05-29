// Barrel — single import surface for cart consumers.
// Pages and components should `import { useCart, cartStore, ... } from "@/lib/cart"`.
export * from "./cart-types";
export {
  cartStore,
  cartSubtotal,
  cartCount,
  lineItemTotal,
  ensureClientHydrated,
} from "./cart-store";
export { useCart } from "./cart-hook";
