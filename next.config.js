const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      bufferutil: false,
      'utf-8-validate': false,
    };

    // Alias @ pour la racine
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname),
      '@menu': path.resolve(__dirname, 'lib/menu'), // 👈 ajout important
    };

    return config;
  },
};

module.exports = nextConfig;
