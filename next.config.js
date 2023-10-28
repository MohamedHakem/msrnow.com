/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: true,
    optimizePackageImports: ['lucide-react', '@heroicons/react', '@headlessui/react']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'demo.vercel.store',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'rasport.store',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'wayupsports.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap/",
      },
      {
        source: "/sitemap",
        destination: "/api/sitemap/",
      },
      {
        source: "/sitemap/:year/:month/:day",
        destination: "/api/sitemap/:year/:month/:day",
      },
      {
        source: "/rss.xml",
        destination: "/api/rss/",
      },
      {
        source: "/rss",
        destination: "/api/rss/",
      },
    ]
  },
};

module.exports = nextConfig;
