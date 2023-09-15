/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "rgba(var(--primary-color))",
        "secondary-color": "rgba(var(--secondary-color))",
        "accent-color": "rgba(var(--accent-color))",
        "accent-dark-color": "rgba(var(--accent-dark-color))",
        skeleton: "var(--skeleton-color)",
        "dark-color": "rgba(var(--dark-color))",
        "light-color": "rgba(var(--light-color))",
      },
      width: {
        container: "min(100%, 980px)",
        "search-bar": " min(80%, 280px)",
      },
      fontFamily: {
        poppins: "'Noto Sans',sans-serif",
      },
      keyframes: {
        shimmer: {
          to: {
            transform: "translateX(100%)",
          },
        },
      },
      animation: {
        shimmer: "shimmer 1.25s infinite",
      },
    },
  },
  plugins: [],
};
