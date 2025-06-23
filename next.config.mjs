import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable static exports if needed
    // output: 'export'
  },
  images: {
    domains: ["placeholder.svg", "localhost"],
    unoptimized: true, // For static export compatibility
  },
};

export default withNextIntl(nextConfig);
