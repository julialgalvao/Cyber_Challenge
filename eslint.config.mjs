// eslint.config.mjs – Flat config (ESLint v9) com TypeScript e RN
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import { fileURLToPath } from 'url';
import path from 'path';

// __dirname equivalente para ESM (funciona no Windows sem "/C:/")
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  // Ignora pastas de build
  { ignores: ['node_modules/**', 'dist/**', 'web-build/**'] },

  // Regras JS “puras” (se houver .js/.jsx)
  {
    ...js.configs.recommended,
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node, ...globals.jest }
    },
    rules: {
      // permite parâmetros iniciando com _ ficarem não usados (ex.: _next)
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    }
  },

  // Regras TS com checagem por tipo (usa tsconfig.json)
  ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
    ...cfg,
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ...cfg.languageOptions,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname   // <- caminho absoluto OK no Windows
      },
      globals: { ...globals.browser, ...globals.node, ...globals.jest }
    },
    rules: {
      // idem para TS
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    }
  }))
];
