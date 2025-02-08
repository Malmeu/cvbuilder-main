/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'images.pexels.com',
      'images.unsplash.com',
      'vcslmteyblvtxzrywvdm.supabase.co'
    ],
  },
  experimental: {
    serverActions: true,
    optimizeFonts: true,
    optimizeImages: true,
    serverComponentsExternalPackages: ['pdf-parse', 'pdf2pic', 'canvas']
  },
  // Optimisation des ressources
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Compression des ressources
  compress: true,
  // Configuration du cache
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
  // Optimisation des performances
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Configuration des en-têtes HTTP pour la sécurité et les performances
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        'pdf-parse': 'commonjs pdf-parse',
        'pdf2pic': 'commonjs pdf2pic',
        'canvas': 'commonjs canvas'
      });
    }
    return config;
  }
};

module.exports = nextConfig;
