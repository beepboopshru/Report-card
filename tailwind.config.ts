import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: { DEFAULT: "#0F6E56", deep: "#085041" },
        good: { 50: "#E1F5EE", 200: "#9FE1CB", 400: "#1D9E75", 600: "#0F6E56", 800: "#085041" },
        ok:   { 50: "#EAF3DE", 400: "#639922", 600: "#3B6D11", 800: "#27500A" },
        warn: { 50: "#FAEEDA", 400: "#EF9F27", 600: "#854F0B", 800: "#633806" },
        bad:  { 50: "#FCEBEB", 200: "#F09595", 600: "#A32D2D", 800: "#791F1F" },
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        serif: ["DM Serif Display", "serif"],
      },
    },
  },
} satisfies Config;
