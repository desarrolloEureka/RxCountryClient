import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "login-image": "url('/assets/bg-login.png')",
                "home-image": "url('/assets/bg-home.png')",
                "gray-image": "url('/assets/bg-gray.png')",
            },
            colors: {
                "company-blue": "#228cf0",
                "company-orange": "#E9A225",
                "company-gray": "#505050",
            },
        },
    },
    plugins: [],
};
export default config;
