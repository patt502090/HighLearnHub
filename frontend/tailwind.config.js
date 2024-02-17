/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'node_modules/flowbite-react/lib/esm/**/*.js',
    "./src/**/*.{html,js}",
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
      colors: {
        'highlearnhub': {
          firstgray : '#807f7d',
          secondgray : '#a6a6a6',
        },
      },
      extends: {},
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};