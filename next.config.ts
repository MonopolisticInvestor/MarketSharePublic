import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*", // Apply these headers to all API routes
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Change to "http://localhost:3000" or your frontend domain for security
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Authorization, Content-Type",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
