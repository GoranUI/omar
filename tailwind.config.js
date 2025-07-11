/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        'dark-bg': '#0a0a0a',
        'dark-card': '#111111',
        'dark-nav': 'rgba(17, 17, 17, 0.7)',
        'white-text': '#ffffff',
        'white-muted': 'rgba(255, 255, 255, 0.6)',
        'border-light': 'rgba(255, 255, 255, 0.1)',
        'grey-light': '#787878',
        'accent-gold': '#ffd700'
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};
