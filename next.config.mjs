/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Permite que o Bracvs seja embutido por iframe:
          // - no próprio domínio
          // - no site oficial visitbraga.travel
          // - em qualquer subdomínio *.vercel.app (a landing das feiras)
          // Quando a landing tiver domínio próprio, acrescenta-o aqui.
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self' https://visitbraga.travel https://*.visitbraga.travel https://*.vercel.app;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
