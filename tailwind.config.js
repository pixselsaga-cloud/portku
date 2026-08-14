/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#070a07",
        foreground: "#f3f4f6",
        card: {
          DEFAULT: "rgba(13, 18, 13, 0.75)",
          border: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(20, 28, 20, 0.85)",
        },
        accent: {
          lime: "#a3e635",
          limeBright: "#bef264",
          limeDark: "#65a30d",
          emerald: "#10b981",
          purple: "#8b5cf6",
          blue: "#3b82f6",
          gold: "#f59e0b",
          rose: "#f43f5e",
          cyan: "#06b6d4"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Space Grotesk", "Outfit", "system-ui", "sans-serif"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'blur(20px)' },
          '100%': { opacity: '0.8', filter: 'blur(30px)' },
        }
      }
    },
  },
  plugins: [],
};
