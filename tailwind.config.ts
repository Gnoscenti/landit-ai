import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#07090d",
        surface: "#11151c",
        "surface-2": "#181d27",
        fg: "#eef2f7",
        muted: "#8b95a8",
        primary: "#10b981",
        "primary-fg": "#04140f",
        border: "#2a3140",
        danger: "#f87171",
      },
    },
  },
  plugins: [],
};
export default config;
