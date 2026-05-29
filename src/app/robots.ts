import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://weltachikankari.in";

/**
 * robots.txt — generated from this file at build time.
 *
 * Disallow /cart and /search?q=... so Google doesn't index personalised
 * or thin pages, but keep the rest of the site fully crawlable. Sitemap
 * pointer lets crawlers discover collections and products fast.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/search"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
