/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html, js, ts, vue}",
    "./src/**/*"
  ],
  theme: {
    extend: {
      colors: {
        tertiary: '#5B246D',
        tertiary500: '#81389A',
        secondary800: '#FF3594',
      }
    },
  },
  plugins: [],
}
