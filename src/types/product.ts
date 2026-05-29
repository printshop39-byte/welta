export type ProductImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ProductBadge = "new" | "bestseller" | "limited" | "festive" | "handcrafted";

export type ProductVariant = {
  id: string;
  label: string;
  size?: string;
  color?: string;
  inStock: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  collectionSlug: string;
  price: number;
  mrp: number;
  currency: "INR";
  rating: number;
  reviewCount: number;
  images: ProductImage[];
  badges: ProductBadge[];
  variants: ProductVariant[];
  fabric?: string;
  craft?: string;
  careInstructions?: string[];

  // Optional commerce metadata carried through from MyBillBook /
  // future ORDS imports. All optional so the 8 hand-made products
  // don't need to change shape. PDP surfaces `sku` when set; cart
  // line items copy `sku` into the WhatsApp order message.
  sku?: string;
  sourceId?: string;
  stock?: number;
  color?: string;
};

export type ProductListParams = {
  collection?: string;
  search?: string;
  limit?: number;
  offset?: number;
};
