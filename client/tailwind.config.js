/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        modal: '400px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

