const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '35.188.192.145',
        port: '',
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
};

export default nextConfig;
