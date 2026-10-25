/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // firebase-admin ต้องรันเป็นแพ็กเกจ Node ฝั่งเซิร์ฟเวอร์ ไม่ให้ bundler รวมเข้าไป
    serverComponentsExternalPackages: ["firebase-admin"],
  },
};

export default nextConfig;
