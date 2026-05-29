#!/usr/bin/env node
/**
 * Welta Chikankari — MyBillBook CSV → Next.js mock-product preview importer.
 *
 * Runs in plain Node 20+ ESM. No external dependencies. Safe-by-default:
 *   - Does NOT touch src/lib/mock/products.ts. Outputs preview JSON only.
 *   - Validates strictly: visible=Yes, sales price > 0, stock > 0.
 *   - Rejects obvious non-products (Alteration, Gift Card, blank name).
 *   - Maps Item Category → site collection slug.
 *   - Generates unique SEO-friendly slugs.
 *
 * Usage (defaults assume the project layout used in this repo):
 *   node scripts/import-products.mjs
 *
 * Explicit override:
 *   node scripts/import-products.mjs \
 *        --csv "data/import/WELTA - bulk_upload.csv" \
 *        --outdir data/import
 *
 * Outputs:
 *   <outdir>/import-preview-products.json
 *   <outdir>/import-rejected-products.json
 *   counts written to stdout
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------- Arg parsing ----------------------------------------------------
function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--csv") out.csv = argv[++i];
    else if (a === "--outdir") out.outdir = argv[++i];
  }
  return out;
}

const args = parseArgs(process.argv);
const projectRoot = resolve(__dirname, "..");
const csvPath = args.csv
  ? resolve(args.csv)
  : resolve(projectRoot, "data/import/WELTA - bulk_upload.csv");
const outDir = args.outdir
  ? resolve(args.outdir)
  : resolve(projectRoot, "data/import");

// ---------- Minimal RFC-4180 CSV parser -----------------------------------
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
      else if (c === "\r") { /* ignore */ }
      else field += c;
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

// ---------- Domain helpers -------------------------------------------------
function num(value) {
  if (value === undefined || value === null) return 0;
  const cleaned = String(value).replace(/[^\d.\-]/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}
function toBool(v) { return String(v || "").trim().toLowerCase() === "yes"; }

const NON_PRODUCT = [/alat?aration/i, /alteration/i, /gift\s*card/i];
function isNonProduct(name) {
  if (!name || !name.trim()) return true;
  return NON_PRODUCT.some((re) => re.test(name));
}

const CATEGORY_RULES = [
  { re: /^\s*$/, slug: null, reason: "blank category" },
  { re: /kids|lucky/i, slug: "kids" },
  { re: /saree/i, slug: "sarees" },
  { re: /dupatta|scarf/i, slug: "dupattas" },
  { re: /(kurta\s*set|co?\W?ord|set\b|cp\W?ord)/i, slug: "kurta-sets" },
  { re: /(short\s*kurta|tunic|top|kurti)/i, slug: "kurtis" },
  { re: /kurta/i, slug: "kurta-sets" },
  { re: /(bottom|pant|plazo|palazzo)/i, slug: "bottoms" },
  { re: /(ear\s*acce|hair|accessor)/i, slug: "accessories" },
  { re: /(indian|fusion|western)/i, slug: "kurta-sets" },
  { re: /a\s*line/i, slug: "kurta-sets" },
];
function categorise(rawCategory) {
  const cat = (rawCategory || "").trim();
  for (const rule of CATEGORY_RULES) {
    if (rule.re.test(cat)) return { slug: rule.slug, reason: rule.reason ?? null, raw: cat };
  }
  return { slug: null, reason: "unmapped category", raw: cat };
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

// Available real product photos. Generic-named matches first; everything
// else falls back to the placeholder.
const KNOWN_IMAGES = {
  "ivory-mul-anarkali": "/products/ivory-mul-anarkali-1.jpg",
  "blush-cotton-kurta-set": "/products/blush-cotton-kurta-set-1.jpg",
  "black-gold-kurta": "/products/black-gold-embroidered-kurta.jpg",
  "black-sleeveless-top": "/products/black-sleeveless-chikankari-top.jpg",
  "green-floral-coord-set": "/products/green-floral-chikankari-coord-set.jpg",
  "blue-cotton-coord-set": "/products/blue-cotton-chikankari-coord-set.jpg",
  "white-chikankari-hero": "/products/welta-hero-white-chikankari.jpg",
};
function guessImage(name) {
  const lower = name.toLowerCase();
  if (/(black).*gold/.test(lower)) return KNOWN_IMAGES["black-gold-kurta"];
  if (/(black).*(sleeveless|top)/.test(lower)) return KNOWN_IMAGES["black-sleeveless-top"];
  if (/(green|olive|mint).*floral/.test(lower)) return KNOWN_IMAGES["green-floral-coord-set"];
  if (/blue.*(coord|kurta\s*set|co?\W?ord)/.test(lower)) return KNOWN_IMAGES["blue-cotton-coord-set"];
  if (/(blush|pink).*kurta\s*set/.test(lower)) return KNOWN_IMAGES["blush-cotton-kurta-set"];
  if (/(ivory|white)\s*mul\s*anarkali/.test(lower)) return KNOWN_IMAGES["ivory-mul-anarkali"];
  if (/(white|ivory).*chikankari/.test(lower)) return KNOWN_IMAGES["white-chikankari-hero"];
  return "/placeholders/placeholder.svg";
}

// ---------- Main ----------------------------------------------------------
const raw = readFileSync(csvPath, "utf8");
const rows = parseCsv(raw);
const header = rows[2] || [];
const dataRows = rows.slice(3);

function colIndex(name) { return header.findIndex((h) => h.trim() === name); }
const idx = {
  itemId: colIndex("Item ID"),
  itemName: header.findIndex((h) => h.startsWith("Item Name")),
  description: colIndex("Description"),
  category: colIndex("Category"),
  itemCode: colIndex("Item code"),
  hsnCode: colIndex("HSN Code"),
  gstRate: colIndex("GST Tax Rate(%)"),
  salesPrice: colIndex("Sales Price"),
  mrp: colIndex("MRP"),
  currentStock: colIndex("Current stock"),
  visible: colIndex("Visible on Online Store?"),
  size: colIndex("Size"),
  colour: colIndex("Colour"),
};

const counts = {
  totalRowsRead: 0, imported: 0, rejected: 0, duplicateSlugFixed: 0,
  blankCategory: 0, zeroOrNegativePrice: 0, zeroOrNegativeStock: 0,
};

const accepted = [];
const rejected = [];
const seenSlugs = new Set();

function uniqueSlug(base) {
  let slug = base || "item";
  if (!seenSlugs.has(slug)) { seenSlugs.add(slug); return slug; }
  let n = 2;
  while (seenSlugs.has(`${slug}-${n}`)) n++;
  const next = `${slug}-${n}`;
  seenSlugs.add(next);
  counts.duplicateSlugFixed++;
  return next;
}

for (const r of dataRows) {
  if (r.every((c) => !c || !c.trim())) continue;
  counts.totalRowsRead++;

  const itemId = (r[idx.itemId] || "").trim();
  const name = (r[idx.itemName] || "").trim();
  const description = (r[idx.description] || "").trim();
  const category = (r[idx.category] || "").trim();
  const itemCode = (r[idx.itemCode] || "").trim();
  const hsnCode = (r[idx.hsnCode] || "").trim();
  const gstRate = num(r[idx.gstRate]);
  const salesPrice = num(r[idx.salesPrice]);
  const mrp = num(r[idx.mrp]);
  const stock = num(r[idx.currentStock]);
  const visible = toBool(r[idx.visible]);
  const size = (r[idx.size] || "").trim();
  const colour = (r[idx.colour] || "").trim();

  // Collect ALL rejection reasons so the review file is informative.
  const reasons = [];
  if (isNonProduct(name)) reasons.push("non-product (alteration/gift card/blank name)");
  if (!visible) reasons.push("not visible on online store");
  if (salesPrice <= 0) { reasons.push("zero or negative sales price"); counts.zeroOrNegativePrice++; }
  if (stock <= 0) { reasons.push("zero or negative stock"); counts.zeroOrNegativeStock++; }

  const cat = categorise(category);
  if (cat.slug === null) {
    if (cat.reason === "blank category") counts.blankCategory++;
    reasons.push(`category needs review (${cat.raw || "blank"})`);
  }

  if (reasons.length > 0) {
    rejected.push({
      sourceId: itemId, name, category, salesPrice, mrp, stock, visible, reasons,
    });
    counts.rejected++;
    continue;
  }

  const slug = uniqueSlug(slugify(name));
  const collectionSlug = cat.slug;
  const imageUrl = guessImage(name);
  const sizes = size ? size.split(/[,/]/).map(s => s.trim().toUpperCase()).filter(Boolean) : [];

  accepted.push({
    sourceId: itemId,
    sku: itemCode || null,
    slug,
    name,
    shortDescription: description || `${name} — handcrafted Lucknowi Chikankari from the Welta atelier.`,
    description: description || `${name} — handcrafted Lucknowi Chikankari from the Welta atelier in Lucknow. Sized ${sizes.join(", ") || "as listed"}; colour ${colour || "as shown"}.`,
    collectionSlug,
    rawCategory: category,
    price: Math.round(salesPrice),
    mrp: Math.round(mrp || salesPrice),
    currency: "INR",
    stock: Math.round(stock),
    gstRate,
    hsnCode: hsnCode || null,
    color: colour || null,
    sizes,
    images: [{
      url: imageUrl,
      alt: `${name} — Welta Chikankari, hand-embroidered in Lucknow${colour ? `; colour ${colour.toLowerCase()}` : ""}`,
    }],
    rating: 4.7,
    reviewCount: 0,
    badges: stock <= 3 ? ["limited"] : ["handcrafted"],
  });
  counts.imported++;
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "import-preview-products.json"), JSON.stringify(accepted, null, 2), "utf8");
writeFileSync(join(outDir, "import-rejected-products.json"), JSON.stringify(rejected, null, 2), "utf8");

console.log("Welta CSV import preview — summary");
console.log("-".repeat(48));
console.log(`Total rows read         : ${counts.totalRowsRead}`);
console.log(`Imported (preview)      : ${counts.imported}`);
console.log(`Rejected                : ${counts.rejected}`);
console.log(`Duplicate slugs fixed   : ${counts.duplicateSlugFixed}`);
console.log(`Blank category          : ${counts.blankCategory}`);
console.log(`Zero/neg price rows     : ${counts.zeroOrNegativePrice}`);
console.log(`Zero/neg stock rows     : ${counts.zeroOrNegativeStock}`);
console.log("-".repeat(48));
console.log(`Preview JSON  : ${join(outDir, "import-preview-products.json")}`);
console.log(`Rejected JSON : ${join(outDir, "import-rejected-products.json")}`);
