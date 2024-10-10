import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        colors: {
            "dark-deep-purple": "#512DA8",
            "light-deep-purple": "#673AB7",
            "lighter-deep-purple": "#7E57C2",
        },
    },
  },
  plugins: [],
};
export default config;
