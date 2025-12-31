/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* ✅ CUSTOM BREAKPOINT */
      screens: {
        mobile: "480px",
        tab: "895px",
        desktop: "1280px",
      },

      /* ✅ CUSTOM COLOR THEME */
      colors: {
        primary: "#9D0009",
        "primary-dark": "#7A0007",
        "primary-light": "#C2333A",
      },
    },
  },
  plugins: [],
};
