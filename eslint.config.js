import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default tseslint.config(
  globalIgnores(['dist']),
  js.configs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs['recommended-latest'],
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      prettier: prettierPlugin,
      ...(reactRefresh.configs.vite.plugins || {}),
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      'comma-style': ['error', 'first'],
      ...eslintConfigPrettier.rules,
      ...(reactRefresh.configs.vite.rules || {}),
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  }
);
