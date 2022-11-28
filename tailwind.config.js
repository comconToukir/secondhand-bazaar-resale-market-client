/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'barlow-cond': 'Barlow Condensed',
        'poppins': 'Poppins',
      }
    },
  },
  plugins: [require("daisyui")],
}
