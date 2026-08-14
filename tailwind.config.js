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
        background: "#08090C",
        foreground: "#f3f4f6",
        card: {
          DEFAULT: "rgba(18, 20, 29, 0.65)",
          border: "rgba(255, 255, 255, 0.07)",
          hover: "rgba(24, 27, 39, 0.85)",
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
          cyan: "#06b6d4",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Space Grotesk", "Syne", "Outfit", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'neon-lime': '0 0 25px rgba(163, 230, 53, 0.25)',
        'neon-lime-lg': '0 0 40px rgba(163, 230, 53, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
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
        },
      },
    },
  },
  plugins: [],
};
