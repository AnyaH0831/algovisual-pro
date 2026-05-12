/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ink-black': '#001219ff',
        'dark-teal': '#005f73ff',
        'dark-cyan': '#0a9396ff',
        'pine-teal': '#004733ff',
        'dusty-olive': '#75906dff',
        'vanilla-custard': '#e9d8a6ff',
        'golden-orange': '#ee9b00ff',
        'rusty-spice': '#bb3e03ff',
        'oxidized-iron': '#ae2012ff',
        'mahogany-red': '#a5211cff',
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
