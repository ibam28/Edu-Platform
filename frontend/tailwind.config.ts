import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-muted": "var(--background-muted)",
        "background-subtle": "var(--background-subtle)",
        surface: "var(--surface)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        subtle: "var(--subtle)",
        primary: {
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          "on-tint": "var(--primary-on-tint)",
        },
        accent: {
          500: "var(--accent-500)",
          600: "var(--accent-600)",
          "on-tint": "var(--accent-on-tint)",
        },
        success: {
          DEFAULT: "var(--success)",
          100: "var(--success-100)",
          700: "var(--success-700)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          100: "var(--warning-100)",
          700: "var(--warning-700)",
        },
        danger: {
          DEFAULT: "var(--danger)",
          100: "var(--danger-100)",
          700: "var(--danger-700)",
        },
        info: {
          DEFAULT: "var(--info)",
          100: "var(--info-100)",
          700: "var(--info-700)",
        },
      },
      borderColor: {
        DEFAULT: "var(--border)",
        strong: "var(--border-strong)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
      },
      ringColor: {
        DEFAULT: "var(--ring)",
      },
      maxWidth: {
        container: "var(--container-max)",
      },
      transitionDuration: {
        fast: "var(--transition-fast)",
        base: "var(--transition-base)",
      },
    },
  },
  plugins: [],
} satisfies Config;
