/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // ...
    'node_modules/flowbite-react/lib/esm/**/*.js',
    "./src/**/*.{html,js}"
  ],
  plugins: [
    // ...
    require('flowbite/plugin'),
  ],
};