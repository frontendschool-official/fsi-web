const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/*.{ts,tsx}'),
    join(__dirname, '../../packages/ui/**/*.{ts,tsx}'),
  ],
  presets: [require('../../packages/ui/tailwind-preset')],
  darkMode: 'class',
  theme: {
    extend: {},
  },
};
