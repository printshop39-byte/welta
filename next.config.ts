import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prepared for ORDS / external image hosts. Add real production
  // image origins (e.g. CDN host) here once the API is wired.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.weltachikankari.in" },
      { protocol: "https", hostname: "images.weltachikankari.in" },
      // TEMP: uncomment to allow APEX-served images straight from the host.
      // { protocol: "https", hostname: "apex.oracle.com" },
    ],
  },

  // Allow `npm run dev` to be opened from other devices on the same wifi
  // (phone preview, tablet, second laptop). Without this, Next 16 logs a
  // "Cross-origin request detected" warning and will block these requests
  // in a future major version. Localhost and 127.0.0.1 are always allowed
  // automatically — no need to list them.
  //
  // Exact LAN IP as shown by `npm run dev` → Network line. If your router
  // assigns your machine a different IP later (DHCP lease change, new
  // wifi), replace the value below with the new one.
  allowedDevOrigins: ["192.168.0.9"],

  // Slightly more conservative bundle output for shared hosts
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
