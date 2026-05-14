import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  /**
   * 🚫 ignores
   */
  {
    ignores: ['dist', 'eslint.config.mjs'],
  },

  /**
   * base recommended JS rules
   */
  js.configs.recommended,

  /**
   * TypeScript recommended + type-checked rules
   */
  ...tseslint.configs.recommendedTypeChecked,

  /**
   * Prettier integration
   */
  prettier,

  /**
   * NestJS / Node environment config
   */
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',

      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  /**
   * custom rules (аналог твоего module.exports.rules)
   */
  {
    rules: {
      /**
       * 🚫 any
       */
      '@typescript-eslint/no-explicit-any': 'warn',

      /**
       * ⚡ async safety
       */
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      /**
       * 🧹 imports
       */
      '@typescript-eslint/consistent-type-imports': 'warn',

      /**
       * 🧹 unused vars
       */
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],

      /**
       * 📦 class members
       */
      '@typescript-eslint/explicit-member-accessibility': [
        'warn',
        {
          accessibility: 'explicit',
        },
      ],

      /**
       * prettier
       */
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'lf',
        },
      ],
    },
  },
);