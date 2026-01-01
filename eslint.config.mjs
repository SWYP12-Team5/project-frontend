import antfu from '@antfu/eslint-config';
import pluginQuery from '@tanstack/eslint-plugin-query';
import betterTailwindcss from 'eslint-plugin-better-tailwindcss';
// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

const tailwindConfig = {
  name: 'tailwind-config',
  files: ['**/*.tsx', '**/*.jsx'],

  plugins: {
    'better-tailwindcss': betterTailwindcss,
  },

  settings: {
    'better-tailwindcss': {
      // Tailwind v4: CSS 파일 경로
      entryPoint: 'app/globals.css',
    },
  },

  rules: {
    // Stylistic 규칙 (경고)
    'better-tailwindcss/multiline': 'warn',
    'better-tailwindcss/sort-classes': 'warn',
    'better-tailwindcss/no-duplicate-classes': 'warn',
    'better-tailwindcss/enforce-consistent-variable-syntax': 'warn',
    'better-tailwindcss/no-unnecessary-whitespace': 'warn',

    // Correctness 규칙 (에러)
    'better-tailwindcss/no-unregistered-classes': 'error',
    'better-tailwindcss/no-conflicting-classes': 'error',
  },
};

const tanstackQueryConfig = {
  name: '@tanstack/query',
  files: ['src/**/*.{ts,tsx}'],
  plugins: {
    '@tanstack/query': pluginQuery,
  },
  rules: pluginQuery.configs.recommended.rules,
};

const storybookConfig = {
  files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)', '.storybook/**/*.@(ts|tsx|js|jsx)'],
  plugins: {
    storybook,
  },
  rules: {
    ...storybook.configs.recommended.rules,
  },
};

export default antfu({
  stylistic: {
    semi: true,
    quotes: 'single',
  },
  react: true,
  nextjs: true,
  vue: false,
  gitignore: true,
  ignores: [
    'mise.toml',
    'public/',
  ],
  formatters: {
    css: true, // CSS, LESS, SCSS 포맷팅 (Prettier 사용)
    html: true, // HTML 포맷팅
    markdown: 'prettier', // Markdown 포맷팅
  },
  rules: {
    'n/prefer-global/process': 'off',
  },
  languageOptions: {
    globals: {
      process: 'readonly',
      __dirname: 'readonly',
      __filename: 'readonly',
    },
  },
}, tailwindConfig, tanstackQueryConfig, storybookConfig);
