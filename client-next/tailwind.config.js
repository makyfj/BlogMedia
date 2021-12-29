const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        brand: {
          100: "#2b2c2b",
          200: "#a3e1bd",
          300: "#91c8a8",
          400: "#7faf93",
          500: "#6d967e",
          600: "#6b7d69",
          700: "#486454",
          800: "#364b3f",
          900: "#e0e7e3",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
