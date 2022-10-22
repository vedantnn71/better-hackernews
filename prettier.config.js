module.exports = {
  plugins: [require("prettier-plugin-svelte", require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.cjs',
  useTab: false,
  singleQuote: false,
  trailingComma: "none",
  printWidth: 100,
  pluginSearchDirs: ["."],
  overrides: [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
}

