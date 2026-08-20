import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, "."),
    resolveAlias: {
      "@in": "./indian/src",
      "@us": "./us/src",
      "@ph": "./ph/src",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@in": path.resolve(__dirname, "./indian/src"),
      "@us": path.resolve(__dirname, "./us/src"),
      "@ph": path.resolve(__dirname, "./ph/src"),
    };
    return config;
  },
};

export default nextConfig;
