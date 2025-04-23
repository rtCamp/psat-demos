/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ejs,js,css}"],
  theme: {
    fontFamily: {
      'sans' : ['Open Sans', 'sans-serif'],
    },
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [{
    tailwindcss: {},
    autoprefixer: {},
  },],
  safelist: [
    'bg-sky-50',
    'bg-green-100',
    'bg-blue-100',
    'bg-red-100',
    'w-[30rem]',
    'w-[60rem]',
    'w-[90rem]',
  ],
}
