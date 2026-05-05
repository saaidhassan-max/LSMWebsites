import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@lsm/ui', '@lsm/tokens'],
};

export default nextConfig;
