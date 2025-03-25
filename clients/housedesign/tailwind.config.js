/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brown': {
          900: '#111', 
          800: '#222',
          700: '#ef4444',
        }
      },
      height: {
        screen: '100vh',
        '400vh': '400vh',
      },
    },
  },
  plugins: [],
}