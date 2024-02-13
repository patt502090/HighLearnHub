/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'node_modules/flowbite-react/lib/esm/**/*.js',
    "./src/**/*.{html,js}",
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extends: {},
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};