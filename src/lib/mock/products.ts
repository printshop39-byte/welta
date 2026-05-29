import type {
  Product,
  ProductBadge,
  ProductVariant,
} from "@/types/product";

// Bulk import from the MyBillBook CSV preview. Source of truth lives in
// data/import/mybillbook-rendered-html/import-preview-products.json so a
// future re-import can overwrite it without touching this file. tsconfig
// has resolveJsonModule:true so the build inlines the data; we transform
// each entry through `adaptImported()` below to produce typed Products.
import importedRaw from "../../../data/import/mybillbook-rendered-html/import-preview-products.json";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

function defaultVariants(productId: string) {
  return sizes.map((s) => ({
    id: `${productId}-${s.toLowerCase()}`,
    label: s,
    size: s,
    inStock: s !== "XS",
  }));
}

/**
 * Build size variants from a curated/MyBillBook product's `sizes` array.
 * When the source has no sizes (most imported items came from CSV rows
 * without size data), fall back to a single Free Size variant so the
 * PDP's "select size" UX still works.
 */
function variantsFromSizes(productId: string, list: string[]): ProductVariant[] {
  if (!list || list.length === 0) {
    return [
      {
        id: `${productId}-free`,
        label: "Free Size",
        inStock: true,
      },
    ];
  }
  return list.map((s) => {
    const safe = s.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    return {
      id: `${productId}-${safe || "size"}`,
      label: s,
      size: s,
      inStock: true,
    };
  });
}

// Shape of one row in import-preview-products.json. JSON's `badges` is
// `string[]` per row; we narrow to ProductBadge in the adapter.
type ImportedRaw = {
  sourceId: string;
  sku: string | null;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  collectionSlug: string;
  rawCategory: string;
  price: number;
  mrp: number;
  currency: "INR";
  stock: number;
  gstRate: number;
  hsnCode: string | null;
  color: string | null;
  sizes: string[];
  images: { url: string; alt: string }[];
  rating: number;
  reviewCount: number;
  badges: string[];
};

const ALLOWED_BADGES: ProductBadge[] = [
  "new",
  "bestseller",
  "limited",
  "festive",
  "handcrafted",
];

function adaptImported(row: ImportedRaw): Product {
  const id = row.sourceId; // UUID — globally unique
  const badges: ProductBadge[] = row.badges.filter((b): b is ProductBadge =>
    ALLOWED_BADGES.includes(b as ProductBadge),
  );

  const product: Product = {
    id,
    slug: row.slug,
    name: row.name,
    shortDescription: row.shortDescription,
    description: row.description,
    collectionSlug: row.collectionSlug,
    price: row.price,
    mrp: row.mrp,
    currency: "INR",
    rating: row.rating,
    reviewCount: row.reviewCount,
    images: row.images,
    badges,
    variants: variantsFromSizes(id, row.sizes),
    // Optional MyBillBook commerce metadata, surfaced on the PDP and
    // carried through the cart's WhatsApp message.
    stock: row.stock,
  };

  if (row.sku) product.sku = row.sku;
  if (row.sourceId) product.sourceId = row.sourceId;
  if (row.color) product.color = row.color;

  return product;
}

// ─────────────────────────────────────────────────────────────────────────
// 8 hand-crafted launch products — featured on the homepage. These carry
// full descriptions, fabric/craft/care metadata and real photos.
// ─────────────────────────────────────────────────────────────────────────
const polishedProducts: Product[] = [
  {
    id: "p-ivory-anarkali",
    slug: "ivory-mul-anarkali",
    name: "Ivory Mul Anarkali with Jaali Hand-work",
    shortDescription: "Floor-length anarkali in handwoven mul",
    description:
      "An ivory floor-length anarkali in pure mul cotton, embroidered with traditional jaali and murri stitches. Comes with a hand-finished dupatta and churidar.",
    collectionSlug: "anarkali",
    price: 14800,
    mrp: 18900,
    currency: "INR",
    rating: 4.8,
    reviewCount: 42,
    images: [
      {
        url: "/products/ivory-mul-anarkali-1.jpg",
        alt: "Welta Chikankari ivory mul anarkali with jaali and murri hand embroidery, front view on a soft ivory backdrop",
      },
    ],
    badges: ["bestseller", "handcrafted"],
    variants: defaultVariants("p-ivory-anarkali"),
    fabric: "Pure mul cotton",
    craft: "Jaali, murri, phanda",
    careInstructions: ["Dry clean only", "Iron on reverse", "Store flat in muslin"],
  },
  {
    id: "p-blush-kurta-set",
    slug: "blush-cotton-kurta-set",
    name: "Blush Cotton Chikankari Kurta Set",
    shortDescription: "Three-piece set with palazzo and dupatta",
    description:
      "A breathable blush cotton kurta with co-ordinated palazzo and chiffon dupatta, finished with classic shadow-work chikankari.",
    collectionSlug: "kurta-sets",
    price: 6800,
    mrp: 8500,
    currency: "INR",
    rating: 4.7,
    reviewCount: 88,
    images: [
      {
        url: "/products/blush-cotton-kurta-set-1.jpg",
        alt: "Blush pink cotton chikankari kurta set with co-ordinated palazzo and shadow-work hand embroidery by Welta Chikankari",
      },
    ],
    badges: ["new"],
    variants: defaultVariants("p-blush-kurta-set"),
    fabric: "Cotton",
    craft: "Shadow work, bakhiya",
  },
  {
    id: "p-navy-georgette-saree",
    slug: "navy-georgette-chikankari-saree",
    name: "Navy Georgette Chikankari Saree",
    shortDescription: "Hand-embroidered six-yard heirloom",
    description:
      "Deep navy georgette saree with antique-gold thread chikankari on the pallu and border. Comes with an unstitched blouse piece.",
    collectionSlug: "sarees",
    price: 12500,
    mrp: 16000,
    currency: "INR",
    rating: 4.9,
    reviewCount: 36,
    images: [
      {
        url: "/products/blue-cotton-chikankari-coord-set.jpg",
        alt: "Deep navy georgette chikankari saree with antique-gold thread embroidery on pallu and border, by Welta Chikankari",
      },
    ],
    badges: ["limited", "festive"],
    variants: [
      { id: "p-navy-georgette-saree-free", label: "Free Size", inStock: true },
    ],
    fabric: "Georgette",
    craft: "Hand chikankari with zari accents",
  },
  {
    id: "p-mul-dupatta-ivory",
    slug: "ivory-mul-dupatta",
    name: "Ivory Mul Hand-Chikankari Dupatta",
    shortDescription: "Featherlight dupatta with murri work",
    description:
      "An airy mul dupatta with all-over murri and tepchi stitches, hand-finished by Lucknow karigars.",
    collectionSlug: "dupattas",
    price: 3200,
    mrp: 4200,
    currency: "INR",
    rating: 4.6,
    reviewCount: 54,
    images: [
      {
        url: "/products/welta-hero-white-chikankari.jpg",
        alt: "Featherlight ivory mul chikankari dupatta with all-over murri and tepchi stitches, hand-finished by Welta Chikankari karigars",
      },
    ],
    badges: ["handcrafted"],
    variants: [
      { id: "p-mul-dupatta-ivory-free", label: "Free Size", inStock: true },
    ],
    fabric: "Mul",
    craft: "Murri, tepchi",
  },
  {
    id: "p-festive-anarkali-gold",
    slug: "antique-gold-festive-anarkali",
    name: "Antique-Gold Festive Anarkali",
    shortDescription: "Statement anarkali for celebrations",
    description:
      "A statement anarkali in antique-gold tissue with dense chikankari on the bodice, paired with a contrast dupatta.",
    collectionSlug: "festive",
    price: 22500,
    mrp: 28000,
    currency: "INR",
    rating: 4.9,
    reviewCount: 21,
    images: [
      {
        url: "/products/black-gold-embroidered-kurta.jpg",
        alt: "Antique-gold festive anarkali in tissue fabric with dense chikankari and sequin accents on the bodice, by Welta Chikankari",
      },
    ],
    badges: ["festive", "limited"],
    variants: defaultVariants("p-festive-anarkali-gold"),
    fabric: "Tissue with cotton lining",
    craft: "Dense chikankari with sequin accents",
  },
  {
    id: "p-mens-kurta-ivory",
    slug: "ivory-mens-chikankari-kurta",
    name: "Ivory Men's Chikankari Kurta",
    shortDescription: "Classic kurta in handwoven cotton",
    description:
      "A classic ivory men's kurta in handwoven cotton with subtle chikankari on the placket and cuffs.",
    collectionSlug: "men",
    price: 4800,
    mrp: 5900,
    currency: "INR",
    rating: 4.7,
    reviewCount: 67,
    images: [
      {
        url: "/products/green-floral-chikankari-coord-set.jpg",
        alt: "Ivory men's chikankari kurta in handwoven cotton with subtle thread work on placket and cuffs, by Welta Chikankari",
      },
    ],
    badges: ["bestseller"],
    variants: defaultVariants("p-mens-kurta-ivory"),
    fabric: "Handwoven cotton",
    craft: "Bakhiya, tepchi",
  },
  {
    id: "p-mint-kurta-set",
    slug: "mint-mul-kurta-set",
    name: "Mint Mul Chikankari Kurta Set",
    shortDescription: "Co-ord set for everyday luxury",
    description:
      "A soft mint mul kurta set with co-ordinated palazzos and a hand-embroidered chiffon dupatta.",
    collectionSlug: "kurta-sets",
    price: 7200,
    mrp: 8900,
    currency: "INR",
    rating: 4.8,
    reviewCount: 51,
    images: [
      {
        url: "/products/black-sleeveless-chikankari-top.jpg",
        alt: "Mint mul chikankari kurta set with shadow work and jaali stitches, paired with co-ordinated palazzos and dupatta, by Welta Chikankari",
      },
    ],
    badges: ["new", "handcrafted"],
    variants: defaultVariants("p-mint-kurta-set"),
    fabric: "Mul",
    craft: "Shadow work, jaali",
  },
  {
    id: "p-pearl-anarkali",
    slug: "pearl-white-anarkali",
    name: "Pearl White Anarkali with Pearl Detailing",
    shortDescription: "Bridal-friendly anarkali with pearl-work",
    description:
      "A pearl-white anarkali in flowing georgette with chikankari and delicate pearl detailing on the neckline.",
    collectionSlug: "anarkali",
    price: 18900,
    mrp: 23500,
    currency: "INR",
    rating: 4.9,
    reviewCount: 29,
    images: [
      {
        url: "/products/welta-hero-white-chikankari.jpg",
        alt: "Bridal-friendly pearl-white anarkali in flowing georgette with chikankari and delicate pearl detailing on the neckline, by Welta Chikankari",
      },
    ],
    badges: ["festive"],
    variants: defaultVariants("p-pearl-anarkali"),
    fabric: "Georgette",
    craft: "Chikankari with pearl-work",
  },
];

// ─────────────────────────────────────────────────────────────────────────
// MyBillBook imports (93 products today). The adapter narrows the
// JSON-typed badges into ProductBadge, builds variants from sizes,
// and surfaces sku/sourceId/stock/color as optional fields.
// ─────────────────────────────────────────────────────────────────────────
const importedProducts: Product[] = (importedRaw as ImportedRaw[]).map(adaptImported);

export const mockProducts: Product[] = [...polishedProducts, ...importedProducts];
