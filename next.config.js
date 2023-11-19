/** @type {import('next').NextConfig} */
const nextConfig = {
    appDir: true,
    experimental: {
        fontLoaders: [
            { loader: "@next/font/google", options: { subsets: ["thai"] } },
        ],
        scrollRestoration: true,

    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.NEXT_PUBLIC_APP_BACKEND_URL,
            },
        ]
    },
    images: {
        domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'], // Add the hostname(s) here
    },
}

module.exports = nextConfig
