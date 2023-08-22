/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    domains: ['cdn.weatherapi.com'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
