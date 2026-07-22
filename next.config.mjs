/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Permite embed via iframe apenas no site oficial (ajusta se necessário)
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self' https://visitbraga.travel https://*.visitbraga.travel;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
