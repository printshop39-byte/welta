"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { cartStore } from "@/lib/cart";
import { notifyAddedToBag, drawerStore } from "@/lib/ui-store";
import { colorToSwatch } from "@/lib/color";

type Props = { product: Product };

/**
 * Compact quick-buy controls for a product grid card.
 *
 * Lives BELOW the card's image/title <Link> (never nested inside it, so
 * there are no nested interactive elements). Renders:
 *   - size chips (in-stock variants only)
 *   - a single colour swatch when the product carries colour data
 *   - a compact "Add to bag" button
 *
 * Behaviour:
 *   - A single-variant product (e.g. "Free Size") auto-selects, so the
 *     customer can add in one tap.
 *   - With multiple sizes, a size must be picked first; the button stays
 *     disabled until then (keeps the card honest about variant choice).
 *   - On add: writes to the existing cartStore, fires the toast, and
 *     opens the cart drawer for instant confirmation.
 *
 * SSR-safe: no Date.now()/Math.random() and no localStorage at render.
 * Initial state is derived purely from props.
 */
export function ProductCardActions({ product }: Props) {
  const inStockVariants = product.variants.filter((v) => v.inStock);
  const single = inStockVariants.length === 1 ? inStockVariants[0] : null;

  const [selectedId, setSelectedId] = useState<string | null>(
    single ? single.id : null,
  );
  const [justAdded, setJustAdded] = useState(false);

  const selected =
    product.variants.find((v) => v.id === selectedId && v.inStock) ?? null;
  const canAdd = !!selected;

  const swatch = product.color ? colorToSwatch(product.color) : null;

  function handleAdd() {
    if (!selected) return;
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
      qty: 1,
      ...(product.sku ? { sku: product.sku } : {}),
    });
    notifyAddedToBag(product.name);
    drawerStore.open();
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <div className="mt-3 flex flex-col gap-2.5">
      {/* Size chips — compact, wrap to a second row only if needed. */}
      {inStockVariants.length > 0 && (
        <div
          className="flex flex-wrap gap-1.5"
          role="radiogroup"
          aria-label={`Select size for ${product.name}`}
        >
          {inStockVariants.map((v) => {
            const isSelected = v.id === selectedId;
            return (
              <button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelectedId(v.id)}
                className={`min-w-[30px] px-1.5 py-1 text-[10px] sm:text-[11px] tracking-[0.06em] border transition-colors ${
                  isSelected
                    ? "border-[var(--color-navy)] bg-[var(--color-navy)] text-[var(--color-ivory)]"
                    : "border-[var(--color-line)] text-[var(--color-navy-ink)] hover:border-[var(--color-navy)]"
                }`}
              >
                {v.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Colour swatch — only when the product has colour data. */}
      {swatch && (
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            title={product.color}
            className="inline-block h-4 w-4 rounded-full border border-[var(--color-line)]"
            style={{ backgroundColor: swatch }}
          />
          <span className="text-[10px] sm:text-[11px] tracking-[0.08em] text-[var(--color-muted)] capitalize">
            {product.color}
          </span>
        </div>
      )}

      {/* Compact Add to bag */}
      <button
        type="button"
        onClick={handleAdd}
        disabled={!canAdd}
        aria-label={`Add ${product.name} to bag`}
        className="mt-0.5 inline-flex items-center justify-center px-3 py-2 min-h-[36px] text-[10px] sm:text-[11px] font-medium tracking-[0.22em] uppercase transition-colors bg-[var(--color-navy)] text-[var(--color-ivory)] hover:bg-[var(--color-navy-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)] disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-navy)]"
      >
        {justAdded ? "Added ✓" : "Add to bag"}
      </button>
    </div>
  );
}
