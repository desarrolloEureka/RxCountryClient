/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "via.placeholder.com",
            },
            {
                protocol: "https",
                hostname: "ui-avatars.com",
            },
            {
                protocol: "https",
                hostname:
                    "firebasestorage.googleapis.com/v0/b/rxcountry-backoffice.appspot.com",
            },
            {
                protocol: "https",
                hostname: "**",
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
