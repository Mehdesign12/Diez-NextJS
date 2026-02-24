import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Formats modernes : WebP + AVIF (compression ~30% mieux que JPEG)
    formats: ["image/avif", "image/webp"],
    // Cache images 7 jours côté CDN
    minimumCacheTTL: 604800,
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "tfisxtkfiowogmthshqg.supabase.co" },
      { protocol: "https", hostname: "qegewzvyjiijozioqsgq.supabase.co" },
    ],
  },
  // Compression Gzip/Brotli activée
  compress: true,
  // Désactiver X-Powered-By header (légère sécu + perf)
  poweredByHeader: false,
  // Experimental: optimisation du bundle
  experimental: {
    optimizePackageImports: [
      "@fortawesome/react-fontawesome",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-brands-svg-icons",
      "motion",
    ],
  },
};

export default nextConfig;
