/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tienda-cdn.bonvivir.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;

