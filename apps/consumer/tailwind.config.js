const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/*.{ts,tsx}'),
    join(__dirname, '../../packages/ui/**/*.{ts,tsx}'),
  ],
  presets: [require('../../packages/ui/tailwind-preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#04AA6D', // Primary color
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
      },
    },
  },
};
