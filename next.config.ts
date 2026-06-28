import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://selfless-mindfulness-production-290e.up.railway.app/api/:path*"
            }
        ];
    }
};

export default nextConfig;
