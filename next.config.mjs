import withBundleAnalyzer from "@next/bundle-analyzer"

const BundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
})

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// })

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    nextScriptWorkers: true,
    fontLoaders: [
      {
        loader: "@next/font/google",
        options: { subsets: ["arabic"] },
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/rss.xml",
        destination: "/api/rss",
      },
      {
        source: "/rss",
        destination: "/api/rss",
      },
    ]
  },
}

// export default nextConfig // for dev
export default BundleAnalyzer(nextConfig) // for prod
