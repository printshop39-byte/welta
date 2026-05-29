# Welta Chikankari — data/import

Scratchpad and source-of-truth for product, marketplace, and reconciliation data feeding the Welta storefront. The Next.js app reads only the imported MyBillBook JSON at build time today; everything else here is reconciliation / audit material.

## Pricing policy — read this first

Flipkart (and other marketplace) prices are **marketplace-specific** and must **not** overwrite website prices without explicit approval.

- The website price in `src/lib/mock/products.ts` (and any future ORDS source) is the **canonical/direct Welta price**.
- The cart subtotal and the WhatsApp order message use the **website price** only.
- Marketplace prices in this folder are stored as **reference data** for reconciliation. They are not displayed on the PDP, not used by the cart, and not synced into the runtime catalog.

If you ever want to align website pricing with Flipkart promotional pricing, that is a brand-level decision and must be approved before any runtime change.

## Files

### Source data

- **`WELTA - bulk_upload.csv`** — MyBillBook bulk-upload export of the full Welta catalog (232 rows, image-less). Single source of truth for SKU + name + category + price + MRP + stock + size + colour.
- **`mybillbook-store-html/`** — Chrome "Save Page As → Complete" of the public MyBillBook storefront. Captured the SPA shell; product cards weren't in the saved DOM. Kept for reference.
- **`mybillbook-rendered-html/`** — Folder reserved for post-render DOM dumps (see Chrome inspector → Copy outerHTML). Empty of HTML today; currently holds JSON copies of earlier import previews.

### Import previews (built by `next-welta/scripts/import-products.mjs`)

- **`mybillbook-rendered-html/import-preview-products.json`** — 93 accepted Welta products extracted from the CSV. Imported into `src/lib/mock/products.ts` via the `adaptImported()` adapter (see that file). Source of truth for the 93 marketplace-ish products on the live site.
- **`mybillbook-rendered-html/import-rejected-products.json`** — 139 rejected CSV rows with reasons (not visible online, no price, no stock, blank category, etc.).
- **`mybillbook-rendered-html/curated-launch-products.json`** — Earlier curated 20-product slice. Superseded by the full-93 import.

### Flipkart reconciliation

- **`flipkart-listing-map-preview.json`** — Result of matching Flipkart Seller SKU Ids against MyBillBook SKUs. Today: 0 matched / 5 unmatched from the listing XLS / 1 inventory-only. Carries an inline `_policy` block restating the pricing rule.
- **`flipkart-sku-aliases.draft.json`** — Manual alias table. Maps Flipkart marketplace SKUs to MyBillBook SKUs. Today only one row is `confirmed-by-user`:

| Flipkart SKU | Welta SKU | Confidence |
|---|---|---|
| `SLEEVLES BLACK TOP` | `GRG680519172076` (RAYON 13 SLEE BLACK TOP) | confirmed-by-user |
| `kurta1` | — | unset |
| `KURTA SET 1` | — | unset |
| `WLT set 1` | — | unset |
| `WLT1Mset` | — | unset |
| `WLT9682KURTA` | — | unset |

When more aliases are confirmed, edit `flipkartSku → suggestedWeltaSku` in the draft file and bump `confidence` to `confirmed-by-user`. The draft is **reference-only**; nothing in `src/` reads from it yet.

## How the site picks up changes

1. Edit `WELTA - bulk_upload.csv` or replace it with a fresh MyBillBook export.
2. Re-run `node scripts/import-products.mjs` from `next-welta/`. This regenerates `mybillbook-rendered-html/import-preview-products.json` and `import-rejected-products.json`.
3. The Next.js app imports the preview JSON at build time. `npm run build` picks up the new product list.
4. **Marketplace reconciliation** (Flipkart aliases, price-diff audits) is a separate step. It does not run automatically and does not touch `src/`.

## What is NOT in this folder

- Product images (kept in `public/products/`).
- Brand assets like the logo (kept in `public/`).
- Any runtime code. Everything in this folder is data or markdown.
