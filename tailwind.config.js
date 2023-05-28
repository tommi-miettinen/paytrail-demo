/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        1: "#1f1f1f",
        2: "#28292a",
        3: "#2d2f31",
        4: "#34363a",
      },
    },
  },
  plugins: [],
};
