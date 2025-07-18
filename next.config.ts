import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'countryflagsapi.com',
      'flagcdn.com',
      'cdn.pixabay.com',
      'res.cloudinary.com',
      'images.unsplash.com',
      'plus.unsplash.com',
      'img.freepik.com',
      'flagsapi.com',
    ],
  },
  eslint: {
    // allow production builds even if ESLint reports errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // allow production builds even if type-checking fails
    ignoreBuildErrors: true,
  },
  /* other config options here */
};

export default nextConfig;
