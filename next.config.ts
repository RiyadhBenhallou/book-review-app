import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows any domain
      },
      {
        protocol: "http",
        hostname: "**", // Allows any domain over HTTP (not recommended for production)
      },
    ],
    domains: ["*"], // This does NOT work for wildcard domains, use remotePatterns instead
    dangerouslyAllowSVG: true, // Allows SVG images
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
