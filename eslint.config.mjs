import globals from "globals"; // Imports a set of global variables for different environments, such as browser and Node.js.
import pluginJs from "@eslint/js"; // Imports the official ESLint plugin for JavaScript, which includes recommended configurations and rules.

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } }, // Configures ESLint to recognize browser-specific global variables.
  pluginJs.configs.recommended, // Applies the recommended ESLint rules for JavaScript.
];
