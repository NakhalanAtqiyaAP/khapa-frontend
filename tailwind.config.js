// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'win-gray': '#C0C0C0',
        'win-dark-gray': '#808080',
        'win-black': '#000000',
        'win-white': '#FFFFFF',
        'win-blue': '#000080',
        'win-light-blue': '#1084D0',
        'win-dark-blue': '#000040',
        'win-red': '#800000',
        'win-green': '#008000',
        'win-yellow': '#808000',
        'win-purple': '#800080',
        'win-teal': '#008080',
      },
      boxShadow: {
        'win-inset': 'inset 2px 2px 4px rgba(0, 0, 0, 0.5)',
        'win-outset': '2px 2px 0px rgba(0, 0, 0, 1)',
        'win-button': 'inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf',
        'win-button-pressed': 'inset -1px -1px #fff, inset 1px 1px #000, inset -2px -2px #dfdfdf, inset 2px 2px #808080',
      },
      fontFamily: {
        'win95': ['"MS Sans Serif"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}