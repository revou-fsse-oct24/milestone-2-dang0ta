/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.imgur.com',
            },

            {
                protocol: 'https',
                hostname: 'placehold.co',
            },

            {
                protocol: 'https',
                hostname: 'picsum.photos',
            }
        ]
    }
  }
   
  export default nextConfig