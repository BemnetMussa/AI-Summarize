/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',  // Optional if you're using Tailwind v3.x where it's the default mode
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },

    },
  },
  plugins: [],
}
