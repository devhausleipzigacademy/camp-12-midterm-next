import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#1C1C27",
          light: "#363740",
        },
        white: {
          DEFAULT: "#FFFFFF",
          dimmed: "rgba(255,255,255,0.4)",
          "dimmed-heavy": "rgba(255,255,255,0.2)",
        },
        yellow: "#FFB43A",
        red: "#EF4444",
        green: "#22C55E",
        customOrange: "#FFB43A",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
