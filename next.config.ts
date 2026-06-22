import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Allow uploading research PDFs through server actions (stored in Postgres).
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
};

export default nextConfig;
