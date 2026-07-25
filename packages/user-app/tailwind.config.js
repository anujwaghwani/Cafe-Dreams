/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cafe: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          500: '#2E7D32',
          600: '#2E7D32', // Keeping 600 for selection class used previously
          900: '#1B5E20'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
