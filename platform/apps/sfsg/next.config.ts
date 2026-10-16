import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, '../../..'),
  transpilePackages: ['@lsm/ui', '@lsm/tokens'],
  async redirects() {
    return [
      { source: '/terms', destination: '/terms-and-conditions', permanent: true },
      { source: '/about', destination: '/about-us', permanent: true },
      { source: '/contact', destination: '/contact-us', permanent: true },
    ];
  },
};

export default nextConfig;
