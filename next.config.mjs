/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: true, // true면 308, false면 307 리다이렉트
            },
        ];
    },
};

export default nextConfig;
