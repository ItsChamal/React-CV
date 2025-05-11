/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",   // let Tailwind scan every component for class names
  ],
  theme: {
    extend: {},              // you can add custom colours later
  },
  plugins: [],
};
