import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  async rewrites() {
    let backendUrl =
      process.env.BACKEND_INTERNAL_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "http://localhost:5000";

    const isVercelOrProd =
      process.env.VERCEL === "1" ||
      Boolean(process.env.VERCEL_ENV) ||
      process.env.NODE_ENV === "production";

    if (
      isVercelOrProd &&
      (backendUrl.includes("localhost") || backendUrl.includes("127.0.0.1"))
    ) {
      backendUrl = "https://your-production-api.vercel.app";
    }

    const cleanUrl = backendUrl.replace(/\/+$/, "").replace(/\/api\/v1$/, "");

    return [
      {
        source: "/api/v1/:path*",
        destination: `${cleanUrl}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
