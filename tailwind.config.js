/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: ["class"], // Active le mode sombre via <html class="dark">
  theme: {
    extend: {
      colors: {
        // 🎨 Thème clair
        background: "#f9fafb",
        foreground: "#111827",

        // Couleurs principales
        primary: {
          DEFAULT: "#2563eb",      // Bleu principal
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#16a34a",      // Vert doux
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

        // 🌙 Thème sombre
        dark: {
          background: "#111827",
          foreground: "#f9fafb",
          card: "#1f2937",
          border: "#374151",
          primary: "#3b82f6",
          secondary: "#22c55e",
          accent: "#fbbf24",
          muted: "#1e293b",
        },
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
}
