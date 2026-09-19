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
        background: "#F8FAFC",
        card: "#FFFFFF",
        "secondary-bg": "#F1F5F9",
        "primary-text": "#0F172A",
        "secondary-text": "#64748B",
        border: "#E2E8F0",
        primary: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
        },
        secondary: "#4F46E5",
        verified: {
          DEFAULT: "#059669",
          bg: "#ECFDF5",
        },
        warning: {
          DEFAULT: "#D97706",
          bg: "#FFFBEB",
        },
        conflict: {
          DEFAULT: "#DC2626",
          bg: "#FEF2F2",
        },
        info: {
          DEFAULT: "#0891B2",
          bg: "#ECFEFF",
        },
      },
      boxShadow: {
        "2xs": "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      },
      spacing: {
        "4.5": "1.125rem",
        "8.5": "2.125rem",
        "9.5": "2.375rem",
        "13": "3.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
