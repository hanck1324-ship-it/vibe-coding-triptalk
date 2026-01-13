/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    // 또는 특정 도메인만 허용하려면 아래와 같이 사용:
    // domains: ['storage.googleapis.com', 's3.amazonaws.com'],
  },
};

module.exports = nextConfig;