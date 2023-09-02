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
        skeleton: "rgb(var(--skeleton-color))",
      },
      // "shimmer": {
      //   "50%": {
      //     "background-color": "rgba(245, 220, 191, 0.15)",
      //   },
      // },
      // animation: {
      //   "shimmer": "shimmer 1.5s infinite",
      // },
      width: {
        container: "min(100%, 980px)",
        "search-bar": " min(80%, 280px)",
      },
    },
  },
  plugins: [],
};
