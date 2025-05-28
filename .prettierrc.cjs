module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  useTabs: false,
  tabWidth: 2,
  printWidth: 100,
  arrowParens: 'always',
  endOfLine: 'lf',

  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-packagejson'
  ],

  organizeImportsSkipDestructiveCodeActions: true,

  overrides: [
    {
      files: ['*.json', '*.json5', 'project.json', 'nx.json', 'tsconfig*.json', '*.config.js', '*.config.mjs'],
      parser: 'json'
    },
    {
      files: ['*.html'],
      parser: 'html'
    },

  {
    files: ['*.md', '*.mdx'],
    options: { proseWrap: 'always' }
  },
  {
    files: ['*.css', '*.scss', '*.sass'],
    parser: 'css'
  }
  ]
};
