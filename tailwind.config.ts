import type { Config } from "tailwindcss";

/**
 * ACCOUNTCLERKS design tokens — mirrors BRAND-DESIGN-SYSTEM.md.
 * Evergreen brand + warm graphite neutrals + brass accent.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FBFAFC",
        cream: { DEFAULT: "#F2ECF7", 2: "#E6D9F0" },
        ink: { DEFAULT: "#160A24", 2: "#1D0F30" },
        // Brand purple (logo). Kept under the `evergreen` key so existing
        // utility classes repaint automatically across the app.
        evergreen: {
          50: "#F3ECF7",
          100: "#E2D0EE",
          300: "#B07FD0",
          500: "#6B2E93",
          600: "#5A2683",
          700: "#4B2175",
          900: "#2C1248",
        },
        cyan: { 400: "#5BC2EC", 500: "#29ABE2", 600: "#1B75BB" },
        neutral: {
          50: "#F4F5F2",
          100: "#E9EBE6",
          200: "#D7DAD3",
          300: "#B9BDB4",
          400: "#8C9189",
          500: "#686D66",
          600: "#4A4F49",
          700: "#343833",
          800: "#20231F",
          900: "#0E1311",
        },
        brass: { 400: "#D81B7E", 600: "#B01566" },
        signal: { warning: "#D9961F", error: "#C5483B", info: "#3E6E8E" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "10px",
        md: "14px",
        lg: "20px",
        xl: "28px",
      },
      boxShadow: {
        e1: "0 1px 2px rgba(14,19,17,.06)",
        e2: "0 4px 12px -2px rgba(14,19,17,.08)",
        e3: "0 12px 32px -8px rgba(14,19,17,.12)",
        e4: "0 32px 64px -24px rgba(14,19,17,.20)",
      },
      transitionTimingFunction: {
        "ease-out-strong": "cubic-bezier(.23,1,.32,1)",
        "ease-in-out-strong": "cubic-bezier(.77,0,.175,1)",
      },
      maxWidth: { content: "1200px", prose: "68ch" },
    },
  },
  plugins: [],
};

export default config;
