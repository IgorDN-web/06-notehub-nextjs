/** @type {import('next').NextConfig} */
const nextConfig = {
  // Разрешаем App Router внутри папки src
  experimental: {
    appDir: true,
  },
  // Указываем корневую папку исходников — если нужно
  // Но обычно достаточно только appDir: true
};

module.exports = nextConfig;
