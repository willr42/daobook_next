/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
};

console.log(nextConfig);
module.exports = nextConfig;
