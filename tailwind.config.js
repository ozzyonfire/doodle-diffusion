/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      cursor: {
        crosshair:
          "url(/crosshair.png) 8 8, crosshair",
      },
    },
  },
  plugins: [],
}
