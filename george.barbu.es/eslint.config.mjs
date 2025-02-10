import studio from '@sanity/eslint-config-studio'

export default [
  ...studio,
  {
    // Add TypeScript and React rules for JSX handling
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    extends: [
      ...studio,
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
    ],
    rules: {
      // Optional: Customize any rules you want to enforce
      'react/prop-types': 'off', // If you're not using prop-types
      '@typescript-eslint/no-unused-vars': 'warn', // Warn about unused vars
    },
  },
]
