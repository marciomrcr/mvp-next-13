/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [/^bg-/, /^to-/, /^from/],
  },

  theme: {
    extend: {
      colors: {
        'dark-purple': '#081A51',
        'light-white': 'rgba(255,255,255,0.17)',
      },
    },
  },
  plugins: [],
};
