module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // place to specify custom ESLint rules. e.g.:
    // '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
  overrides: [
    {
      files: [
        '*.config.js',
        '*.config.ts',
        'tailwind.config.js',
        'postcss.config.js',
      ],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
