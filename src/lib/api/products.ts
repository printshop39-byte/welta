import type { Product, ProductListParams } from "@/types/product";
import { USE_MOCK, apexGet } from "@/lib/apex";
import { mockProducts } from "@/lib/mock/products";

const REVALIDATE = 300;

export async function getProducts(
  params: ProductListParams = {},
): Promise<Product[]> {
  if (USE_MOCK) {
    let list = [...mockProducts];
    if (params.collection) {
      list = list.filter((p) => p.collectionSlug === params.collection);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.collectionSlug.toLowerCase().includes(q),
      );
    }
    if (typeof params.offset === "number") list = list.slice(params.offset);
    if (typeof params.limit === "number") list = list.slice(0, params.limit);
    return list;
  }

  const qs = new URLSearchParams();
  if (params.collection) qs.set("collection", params.collection);
  if (params.search) qs.set("q", params.search);
  if (typeof params.limit === "number") qs.set("limit", String(params.limit));
  if (typeof params.offset === "number") qs.set("offset", String(params.offset));
  const path = `/products${qs.size ? `?${qs}` : ""}`;
  const data = await apexGet<{ items: Product[] }>(path, {
    revalidate: REVALIDATE,
    tags: ["products"],
  });
  return data.items;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (USE_MOCK) {
    return mockProducts.find((p) => p.slug === slug) ?? null;
  }
  try {
    const data = await apexGet<Product>(`/products/${encodeURIComponent(slug)}`, {
      revalidate: REVALIDATE,
      tags: ["products", `product:${slug}`],
    });
    return data;
  } catch {
    return null;
  }
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const all = await getProducts();
  return all
    .filter((p) => p.badges.includes("bestseller") || p.badges.includes("new"))
    .slice(0, limit);
}
