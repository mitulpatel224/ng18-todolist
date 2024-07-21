/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors:{
        primary:'#EF5A6F',
        background:'#FFF1DB',
        foreground:'#D4BDAC',
        accent:'#536493'
      },
    },
  },
  plugins: [],
}

