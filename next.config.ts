import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'tfisxtkfiowogmthshqg.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'qegewzvyjiijozioqsgq.supabase.co',
      },
    ],
  },
};

export default nextConfig;
