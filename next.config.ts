import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.oyonews.com.ng'],
  },
};

export default nextConfig;
