// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Permite o uso de 'any'
      '@typescript-eslint/no-floating-promises': 'warn', // Permite promessas flutuantes
      '@typescript-eslint/no-unsafe-argument': 'warn', // Permite argumentos inseguros
      '@typescript-eslint/no-unsafe-assignment': 'warn', // Permite atribuições inseguras
      '@typescript-eslint/await-thenable': 'off', // Permite o uso de thenables
      '@typescript-eslint/require-await': 'off', // Permite funções assíncronas sem await
      '@typescript-eslint/no-misused-promises': 'off', // Permite promessas mal utilizadas
    },
  },
);