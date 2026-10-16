import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    // include a 1440 step so full-bleed images on common laptops request
    // 1440px instead of rounding up to 1920
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840],
  },
};
export default nextConfig;
