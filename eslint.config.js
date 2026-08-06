import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig([
    {
        ignores: ['.svelte-kit/**', 'src/paraglide/**', 'src/translations/**'],
    },
    { files: ['src/**/*.{js,mjs,cjs,ts}'] },
    { files: ['src/**/*.{js,mjs,cjs,ts}'], languageOptions: { globals: globals.browser } },
    { files: ['src/**/*.{js,mjs,cjs,ts}'], plugins: { js }, extends: ['js/recommended'] },
    tseslint.configs.recommended,
]);
