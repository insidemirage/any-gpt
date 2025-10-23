import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
        process: 'readonly',
        HTMLDivElement: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/no-unknown-property': ['error', { ignore: ['css'] }], // Allow css prop for Emotion
      '@typescript-eslint/no-unused-vars': 'off', // Allow unused vars for now
      '@typescript-eslint/no-empty-object-type': 'off', // Allow empty interfaces
      'prefer-arrow-callback': 'error', // Prefer arrow functions
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];