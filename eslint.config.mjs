import typescriptEslint from "@typescript-eslint/eslint-plugin"
import obsidianmd from "eslint-plugin-obsidianmd"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"

export default defineConfig([
  globalIgnores([
		"node_modules",
		"dist",
		"esbuild.config.mjs",
		"eslint.config.js",
		"version-bump.mjs",
		"versions.json",
		"main.js",
	]),
  {
		languageOptions: {
			globals: {
				...globals.browser,
			},
			parserOptions: {
				projectService: {
					allowDefaultProject: [
						'eslint.config.js',
						'manifest.json'
					]
				},
				tsconfigRootDir: import.meta.dirname,
				extraFileExtensions: ['.json']
			},
    },
	},
	...obsidianmd.configs.recommended,
	{
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      "no-unused-vars": "off",

      "@typescript-eslint/no-unused-vars": ["error", {
        args: "none",
      }],

      "@typescript-eslint/ban-ts-comment": "off",
      "no-prototype-builtins": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-base-to-string": "off",

      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-call": "off",

      "obsidianmd/ui/sentence-case": "off",
    },
	},
])
