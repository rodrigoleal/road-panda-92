const nextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '35.188.192.145',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8000/graphql',
      },
    ];
  },
};

export default nextConfig;
