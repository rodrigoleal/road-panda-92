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
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    // Get the base URL from the env, removing /graphql
    const wpUrl = process.env.WORDPRESS_URL || 
                 (process.env.NEXT_PUBLIC_WORDPRESS_API_URL ? process.env.NEXT_PUBLIC_WORDPRESS_API_URL.replace('/graphql', '') : 'http://35.188.192.145');
    return [
      {
        source: '/wp-content/:path*',
        destination: `${wpUrl}/wp-content/:path*`,
      },
    ];
  },
};

export default nextConfig;
