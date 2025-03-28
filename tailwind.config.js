module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif'],
        sans: ['Source Sans 3', 'sans-serif'],
      },
      fontSize: {
        'blog-title': '3.5rem',
        'blog-heading': '2.5rem',
        'blog-text': '1.25rem',
      },
      lineHeight: {
        'blog': '1.5',
      }
    },
  },
  plugins: [],
};