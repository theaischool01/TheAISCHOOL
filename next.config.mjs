import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.resolve(__dirname, "."),
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
