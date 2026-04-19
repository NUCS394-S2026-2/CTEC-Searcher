/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#f9f5fc',
          100: '#f1e8f7',
          200: '#dfcded',
          300: '#c6aaea',
          400: '#a87fc1',
          500: '#8e57b3',
          600: '#743ea4',
          700: '#4E2A84', // Northwestern Purple
          800: '#43266f',
          900: '#38225a',
          950: '#251241',
        },
      },
    },
  },
  plugins: [],
};
