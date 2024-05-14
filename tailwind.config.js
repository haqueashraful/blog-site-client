/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [ "light", "dark" ],
  },
  theme: {
    extend: {
      colors: {
        secondary: "#14B8A6",
      }
    },
  },
  plugins: [require("daisyui")],
 }