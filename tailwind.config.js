/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Premium medical color palette with high contrast for elderly readability
        medical: {
          50: '#F0F7FF',
          100: '#E0EFFE',
          200: '#BADAFE',
          300: '#7CBBFD',
          400: '#3694F9',
          500: '#0C75EA',
          600: '#005AC6',
          700: '#01479F',
          800: '#063E81',
          900: '#0B3469',
          950: '#072145',
        },
        slate: {
          850: '#172033',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        'soft-xl': '0 20px 27px 0 rgba(0, 0, 0, 0.05)',
        'soft-md': '0 4px 14px 0 rgba(0, 0, 0, 0.04)',
        'medical-glow': '0 0 25px -5px rgba(12, 117, 234, 0.25)',
      },
    },
  },
  plugins: [],
};
