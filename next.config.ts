/** @type {import('next').NextConfig} */
const nextConfig = {
  // Стандартна конфігурація, без застарілих параметрів
  reactStrictMode: true, // (опційно) корисно для перевірок у dev
  swcMinify: true,        // (опційно) швидше збирання в продакшн
};

export default nextConfig;
