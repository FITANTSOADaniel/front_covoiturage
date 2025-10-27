/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: "#f9fafb",
        foreground: "#111827",

        primary: {
          DEFAULT: "#2563eb",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#16a34a",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#f59e0b",      // Orange
          foreground: "#ffffff",
        },

        // Couleurs neutres
        muted: {
          DEFAULT: "#f3f4f6",      // Gris clair
          foreground: "#6b7280",
        },
        card: "#ffffff",
        border: "#e5e7eb",
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
}
