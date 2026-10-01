import { brandTheme } from "./src/constants/brandTheme";
import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        blue: {
          50: "#eaebee",
          100: "#dfe1e5",
          200: "#bdc1ca",
          600: "#2563eb",
          800: "#2a3653",
        },
        brand: {
          DEFAULT: brandTheme.primary,
          hover: brandTheme.primaryHover,
          muted: brandTheme.primaryMuted,
          foreground: brandTheme.onPrimary,
        },
        green: {
          50: "#edf5f2",
          500: brandTheme.primary,
          600: brandTheme.primaryHover,
          700: brandTheme.primaryMuted,
        },
        grey: {
          300: "#afafaf",
          800: "#3b3b3b",
          950: "#151515",
        },
        red: {
          50: "#fef2f2",
          400: "#f87171",
          500: "#ff2323",
          600: "#dc2626",
          700: "#b91c1c",
        },
        neutral: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          400: "#9ca3af",
          500: "#6b7280",
          700: "#374151",
          900: "#111827",
          950: "#000000",
        },
        white: {
          DEFAULT: "#ffffff",
          50: "#fafafa",
          100: "#efefef",
        },
        shark: {
          50: "#f5f5f5",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          750: "#4e4e43",
          800: "#454545",
          900: "#3d3d3d",
          950: "#1f1f1f",
        },
      },
      fontFamily: {
        sans: ["var(--font-figtree)", "Arial", "Helvetica", "sans-serif"],
        figtree: ["var(--font-figtree)", "sans-serif"],
        inter: ["var(--font-figtree)", "sans-serif"],
        roboto: ["var(--font-figtree)", "sans-serif"],
        poppins: ["var(--font-figtree)", "sans-serif"],
      },
      maxWidth: {
        container: "1440px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        popover: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
