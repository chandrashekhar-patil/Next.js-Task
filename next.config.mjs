/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'astralpaints.kwebmakerdigitalagency.com',
          pathname: '/wp-content/uploads/**',
        },
      ],
    },
  };
  
  export default nextConfig;