"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist, wishlistStore } from "@/lib/wishlist";
import { cartStore } from "@/lib/cart";
import { notifyAddedToBag, drawerStore } from "@/lib/ui-store";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import type { WishlistItem } from "@/lib/wishlist";

/**
 * Client view for /wishlist. Reads the persisted wishlist via the store
 * (empty on the server / first render, then hydrated) and renders saved
 * pieces with View piece, Add to bag, and Remove actions.
 *
 * "Add to bag" here adds a Free-Size line (we don't capture a size on
 * the wishlist) so the quick action always works; the customer can still
 * pick a specific size on the PDP via "View piece".
 */
export function WishlistView() {
  const wishlist = useWishlist();
  const items = wishlist.items;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-gold-deep)] mb-4">
          Wishlist
        </p>
        <h1 className="text-4xl sm:text-5xl text-[var(--color-navy-ink)] leading-tight">
          Your wishlist is empty
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-base text-[var(--color-muted)] leading-relaxed">
          Save your favourite chikankari pieces here.
        </p>
        <div className="mt-10 flex justify-center">
          <Button as="link" href="/collections" variant="primary">
            Explore Collections
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.38em] text-[var(--color-gold-deep)] mb-3">
        Wishlist
      </p>
      <h1 className="text-3xl sm:text-4xl lg:text-[44px] text-[var(--color-navy-ink)] leading-[1.1]">
        {items.length === 1
          ? "1 saved piece"
          : `${items.length} saved pieces`}
      </h1>

      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {items.map((item) => (
          <WishlistCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function WishlistCard({ item }: { item: WishlistItem }) {
  const hasDiscount = item.mrp > item.price;

  function handleAddToBag() {
    cartStore.addItem({
      key: `${item.id}::free`,
      productId: item.id,
      productSlug: item.slug,
      productName: item.name,
      variantId: "free",
      variantLabel: "Free Size",
      unitPrice: item.price,
      unitMrp: item.mrp,
      image: item.image,
      qty: 1,
    });
    notifyAddedToBag(item.name);
    drawerStore.open();
  }

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/products/${item.slug}`}
        className="flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
        aria-label={item.name}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream)]">
          <Image
            src={item.image.url}
            alt={item.image.alt || item.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.035]"
          />
        </div>
        <div className="pt-4 flex flex-col gap-2">
          <h3 className="text-[15px] sm:text-base text-[var(--color-navy-ink)] leading-snug line-clamp-2 group-hover:text-[var(--color-gold-deep)] transition-colors">
            {item.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-[13px] sm:text-sm font-medium text-[var(--color-navy-ink)] tabular-nums">
              {formatINR(item.price)}
            </span>
            {hasDiscount && (
              <span className="text-[11px] sm:text-xs text-[var(--color-muted)] line-through tabular-nums">
                {formatINR(item.mrp)}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="mt-3 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleAddToBag}
          aria-label={`Add ${item.name} to bag`}
          className="inline-flex items-center justify-center px-3 py-2 min-h-[36px] text-[10px] sm:text-[11px] font-medium tracking-[0.22em] uppercase transition-colors bg-[var(--color-navy)] text-[var(--color-ivory)] hover:bg-[var(--color-navy-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]"
        >
          Add to bag
        </button>
        <div className="flex items-center justify-between">
          <Link
            href={`/products/${item.slug}`}
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[var(--color-muted)] hover:text-[var(--color-navy-ink)] transition-colors"
            aria-label={`View ${item.name}`}
          >
            View piece
            <span aria-hidden="true">→</span>
          </Link>
          <button
            type="button"
            onClick={() => wishlistStore.remove(item.id)}
            aria-label={`Remove ${item.name} from wishlist`}
            className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[var(--color-muted)] hover:text-[var(--color-gold-deep)] transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
