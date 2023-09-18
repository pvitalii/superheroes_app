/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      margin: {
        '15%': '15%'
      },
      minWidth: {
        '50%': '50%'
      },
      maxWidth: {
        '70%': '70%'
      }
    }
  },
  plugins: []
};
