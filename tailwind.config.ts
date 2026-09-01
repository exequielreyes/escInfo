import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0E1626",
          50: "#F2F4F7",
          100: "#DFE4EC",
          400: "#4B5C77",
          700: "#16223A",
          900: "#0E1626",
        },
        paper: "#F6F5F1",
        teal: {
          DEFAULT: "#1C8C7D",
          50: "#E7F4F1",
          100: "#CDE9E3",
          400: "#2AA593",
          600: "#1C8C7D",
          700: "#146B5F",
        },
        amber: {
          DEFAULT: "#E8A33D",
          100: "#FBEBD1",
          400: "#EDB55F",
          600: "#E8A33D",
        },
        coral: "#E2543A",
        slate: {
          DEFAULT: "#566072",
          200: "#D7DAE1",
          500: "#566072",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "36px 36px",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s step-start infinite",
      },
    },
  },
  plugins: [],
};

export default config;
