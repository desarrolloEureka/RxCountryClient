/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "via.placeholder.com",
            },
        ],
    },
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
    ) => {
        config.externals.push({ canvas: "commonjs canvas" });
        return config;
    },
};

export default nextConfig;
