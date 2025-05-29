module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  useTabs: false,
  tabWidth: 2,
  printWidth: 120,
  quoteProps: 'as-needed',
  proseWrap: 'preserve',
  singleAttributePerLine: true,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'auto',

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
      parser: 'angular'
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
