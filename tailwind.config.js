/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f9f5',
          100: '#e1f2e8',
          200: '#c5e4d2',
          300: '#9acfaf',
          400: '#69b286',
          500: '#439564',
          600: '#32794f',
          700: '#286040',
          800: '#234d35',
          900: '#1d402d',
          950: '#0e2318',
        },
        cream: {
          50: '#fdfcf9',
          100: '#fbf9f4',
          200: '#f5f0e8',
          300: '#ebe3d5',
          400: '#ddd0bd',
        },
        earth: {
          50: '#f9f6f0',
          100: '#f0eae0',
          500: '#8c6d48',
          700: '#5c452d',
          900: '#3b2b1c',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Noto Sans Bengali',
          'sans-serif'
        ],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'card': '0 4px 20px -2px rgba(18, 50, 30, 0.05), 0 2px 6px -1px rgba(18, 50, 30, 0.03)',
        'glow': '0 0 20px -5px rgba(50, 121, 79, 0.2)',
      }
    },
  },
  plugins: [],
}
