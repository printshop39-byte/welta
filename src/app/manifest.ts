import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Welta Chikankari",
    short_name: "Welta",
    description:
      "Premium Lucknowi Chikankari — kurtas, anarkalis, sarees and dupattas, hand-embroidered in Lucknow.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#163B2F",
    background_color: "#FAF7F0",
    categories: ["shopping", "lifestyle", "fashion"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
