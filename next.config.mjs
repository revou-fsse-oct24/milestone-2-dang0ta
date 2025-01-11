/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    distDir: './dist', // Changes the build output directory to `./dist/`.
    output: "standalone",
  }
   
  export default nextConfig