import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: { DEFAULT: "#0F6E56", deep: "#085041" },
        // Semantic neutrals for crisp SaaS look
        surface: { DEFAULT: "#FFFFFF", muted: "#F7F7F8", sunken: "#FAFAF8" },
        ink: { DEFAULT: "#0F1115", muted: "#5B6470", subtle: "#8A93A0" },
        line: { DEFAULT: "#E5E7EB", strong: "#D1D5DB" },
        // Existing scoring palette (used by ScoreRow + PDFs — do not remove)
        good: { 50: "#E1F5EE", 200: "#9FE1CB", 400: "#1D9E75", 600: "#0F6E56", 800: "#085041" },
        ok:   { 50: "#EAF3DE", 400: "#639922", 600: "#3B6D11", 800: "#27500A" },
        warn: { 50: "#FAEEDA", 400: "#EF9F27", 600: "#854F0B", 800: "#633806" },
        bad:  { 50: "#FCEBEB", 200: "#F09595", 600: "#A32D2D", 800: "#791F1F" },
        // Status aliases for primitives
        danger:  { DEFAULT: "#A32D2D", soft: "#FCEBEB" },
        success: { DEFAULT: "#0F6E56", soft: "#E1F5EE" },
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        serif: ["DM Serif Display", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(15, 17, 21, 0.04), 0 1px 3px 0 rgba(15, 17, 21, 0.06)",
        pop:  "0 8px 24px -8px rgba(15, 17, 21, 0.18), 0 2px 6px -2px rgba(15, 17, 21, 0.08)",
      },
      borderRadius: {
        DEFAULT: "8px",
      },
    },
  },
} satisfies Config;
