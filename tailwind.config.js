/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3f2',
          100: '#fde6e4',
          200: '#fccfcb',
          300: '#f9a8a1',
          400: '#f47567',
          500: '#eb4e3d',
          600: '#d73426',
          700: '#b5291d',
          800: '#96261c',
          900: '#7c271e',
        },
      },
    },
  },
  plugins: [],
}
