/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ejs,js}"],
  theme: {
    fontFamily: {
      'sans' : ['Open Sans', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-sky-50',
    'bg-green-100',
    'bg-blue-100',
    'bg-red-100',
  ],
}

