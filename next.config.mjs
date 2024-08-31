/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    // experimental: {
    //     serverActions: true,
    // },
    images: {
        remotePatterns: [
            {
                hostname: 'lh3.googleusercontent.com',
            },
            {
                hostname: 'github.com',

            }
        ]
    }
};

export default nextConfig;
