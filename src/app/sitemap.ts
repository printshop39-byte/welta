import type { MetadataRoute } from "next";
import { getCollections } from "@/lib/api/collections";
import { getProducts } from "@/lib/api/products";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://weltachikankari.in";

/**
 * Dynamic XML sitemap built from the same data layer that powers the
 * pages. As soon as ORDS is wired, getCollections/getProducts return
 * live data and the sitemap auto-tracks it — no separate config to
 * remember.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/collections`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/size-guide`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.3,
    },
  ];

  // Collections and products are wrapped in try/catch so a transient
  // ORDS hiccup at build time still produces a valid (smaller) sitemap
  // instead of a 500.
  let collections: MetadataRoute.Sitemap = [];
  let products: MetadataRoute.Sitemap = [];

  try {
    const cs = await getCollections();
    collections = cs.map((c) => ({
      url: `${SITE_URL}/collections/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    collections = [];
  }

  try {
    const ps = await getProducts();
    products = ps.map((p) => ({
      url: `${SITE_URL}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    products = [];
  }

  return [...staticEntries, ...collections, ...products];
}
