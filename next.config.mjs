/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray package-lock.json one directory up makes Next guess the wrong
  // workspace root; pin it to this project.
  turbopack: {
    root: import.meta.dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
