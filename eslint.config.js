const js = require('@eslint/js');
const globals = require('globals');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  {
    ignores: ['node_modules/**'],
  },
  js.configs.recommended,
  {
    files: ['server/**/*.js'],
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'linebreak-style': 0,
      'no-console': 'warn',
      'import/no-unresolved': 'error',
      'import/no-duplicates': 'error',
    },
  },
];
