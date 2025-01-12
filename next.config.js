/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse', 'pdf2pic', 'canvas']
  },
  images: {
    domains: ['i.ibb.co', 'images.pexels.com'],
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
}

module.exports = nextConfig
