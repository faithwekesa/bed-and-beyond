import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.100.180'],
  turbopack: { root: process.cwd() },
}

export default nextConfig
