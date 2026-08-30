import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits a fully static site into ./out — no Node server needed to host it.
  output: "export",
  // The export target has no image optimizer at runtime.
  images: { unoptimized: true },
  // Writes out/index.html style directories, which every static host serves correctly.
  trailingSlash: true,
};

export default nextConfig;
