import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
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
  turbopack: {
    root: path.resolve(__dirname, "."),
    resolveAlias: {
      "@ph": "./ph/src",
      "@us": "./us/src",
      "@in": "./indian/src",
    },
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
