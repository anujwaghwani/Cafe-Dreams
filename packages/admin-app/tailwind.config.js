/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        admin: {
          50: '#f8fafc',
          100: '#f1f5f9',
          800: '#1e293b',
          900: '#0f172a',
        },
        brand: {
          500: '#8b5cf6', // Violet for admin primary action
          600: '#7c3aed',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
