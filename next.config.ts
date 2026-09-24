import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
        pathname: "/**",
      },
      // add more patterns here as needed, e.g.:
      // { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;