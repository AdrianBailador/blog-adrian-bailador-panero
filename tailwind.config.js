// tailwind.config.js
module.exports = {
  darkMode: 'class', // Esto es importante para que el modo oscuro se base en una clase
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
