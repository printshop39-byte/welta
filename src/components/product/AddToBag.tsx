"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { cartStore } from "@/lib/cart";

type AddToBagProps = {
  product: Product;
};

/**
 * The PDP's purchase island. Server-renders the static surroundings,
 * this client component owns variant selection, qty, and the "Add to
 * Bag" / "Coming soon" wishlist interactions.
 *
 * UX rules:
 *  - Size selection is required before Add to Bag is enabled. Clicking
 *    Add without a selection focuses the size group and shows an
 *    aria-live message.
 *  - Out-of-stock sizes can't be selected.
 *  - After adding, the button briefly shows "Added ✓" so the user gets
 *    confirmation without a modal interrupting flow.
 */
export function AddToBag({ product }: AddToBagProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    // For Free-Size products there's only one variant — auto-select it
    // so the customer doesn't get blocked by a size requirement that
    // doesn't apply to them.
    product.variants.length === 1 && product.variants[0].inStock
      ? product.variants[0].id
      : null,
  );
  const [qty, setQty] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);
  const [wishlistMsg, setWishlistMsg] = useState(false);

  const selected = product.variants.find((v) => v.id === selectedId) ?? null;
  const canAdd = !!selected && selected.inStock;

  function handleSelect(variantId: string, inStock: boolean) {
    if (!inStock) return;
    setSelectedId(variantId);
    setError(null);
  }

  function handleAdd() {
    if (!canAdd || !selected) {
      setError("Please select a size first.");
      return;
    }
    const image = product.images[0];
    cartStore.addItem({
      key: `${product.id}::${selected.id}`,
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      variantId: selected.id,
      variantLabel: selected.label,
      unitPrice: product.price,
      unitMrp: product.mrp,
      image: {
        url: image?.url ?? "/placeholders/placeholder.svg",
        alt: image?.alt ?? product.name,
      },
      qty,
      // Optional MyBillBook SKU — preserved for the atelier team in
      // the WhatsApp order message. Undefined for hand-made products
      // that don't carry a code.
      ...(product.sku ? { sku: product.sku } : {}),
    });
    setError(null);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  }

  function handleWishlist() {
    setWishlistMsg(true);
    window.setTimeout(() => setWishlistMsg(false), 2200);
  }

  return (
    <div className="mt-10">
      <div className="flex items-baseline justify-between mb-3 gap-3">
        <p
          id={`size-label-${product.id}`}
          className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]"
        >
          Size
        </p>
        {/* Tiny support link — opens /size-guide in a new tab so the
            customer's add-to-bag flow isn't interrupted. No JS, no
            behavior change to the picker. */}
        <a
          href="/size-guide"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-[0.22em] uppercase text-[var(--color-gold-deep)] hover:text-[var(--color-navy-ink)] transition-colors"
        >
          Size guide ↗
        </a>
      </div>
      <div
        role="radiogroup"
        aria-labelledby={`size-label-${product.id}`}
        className="flex flex-wrap gap-2"
      >
        {product.variants.map((v) => {
          const isSelected = v.id === selectedId;
          const baseCls =
            "min-w-[48px] text-center px-3 sm:px-4 py-2 text-sm border transition-colors";
          const stateCls = !v.inStock
            ? "border-[var(--color-line)] text-[var(--color-muted)] line-through cursor-not-allowed"
            : isSelected
            ? "border-[var(--color-navy)] bg-[var(--color-navy)] text-[var(--color-ivory)]"
            : "border-[var(--color-navy)] text-[var(--color-navy-ink)] hover:bg-[var(--color-navy)] hover:text-[var(--color-ivory)] cursor-pointer";
          return (
            <button
              key={v.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-disabled={!v.inStock}
              disabled={!v.inStock}
              onClick={() => handleSelect(v.id, v.inStock)}
              className={`${baseCls} ${stateCls}`}
            >
              {v.label}
            </button>
          );
        })}
      </div>

      {/* Quantity stepper */}
      <div className="mt-8 flex items-center gap-4">
        <span className="text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">
          Quantity
        </span>
        <div className="inline-flex items-center border border-[var(--color-navy)]">
          <button
            type="button"
            aria-label="Decrease quantity"
            className="w-10 h-10 inline-flex items-center justify-center text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-[var(--color-ivory)] transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[var(--color-navy)]"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
          >
            −
          </button>
          <span
            aria-live="polite"
            className="w-10 text-center text-sm tabular-nums"
          >
            {qty}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            className="w-10 h-10 inline-flex items-center justify-center text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-[var(--color-ivory)] transition-colors"
            onClick={() => setQty((q) => q + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* aria-live error region: announced to screen readers without
          stealing focus or shifting layout (height reserved). */}
      <p
        role="status"
        aria-live="polite"
        className={`mt-4 text-xs tracking-[0.18em] uppercase min-h-[1.25rem] ${
          error ? "text-[var(--color-gold-deep)]" : "text-transparent"
        }`}
      >
        {error || "·"}
      </p>

      <div className="mt-2 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!canAdd}
          className="flex-1 inline-flex items-center justify-center gap-2 px-7 py-3 min-h-[44px] text-[12px] sm:text-sm font-medium tracking-[0.2em] uppercase transition-colors duration-200 bg-[var(--color-navy)] text-[var(--color-ivory)] hover:bg-[var(--color-navy-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-navy)]"
        >
          {justAdded ? "Added ✓" : "Add to Bag"}
        </button>
        <button
          type="button"
          onClick={handleWishlist}
          aria-label="Add to wishlist (coming soon)"
          className="flex-1 relative inline-flex items-center justify-center gap-2 px-7 py-3 min-h-[44px] text-[12px] sm:text-sm font-medium tracking-[0.2em] uppercase transition-colors duration-200 bg-transparent text-[var(--color-navy)] border border-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-[var(--color-ivory)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
        >
          {wishlistMsg ? "Coming soon" : "Add to Wishlist"}
        </button>
      </div>
    </div>
  );
}
