const { nextui } = require('@nextui-org/react');
const aiLabPreset = require('@luxrobo/ai-lab/tailwind-preset');
const path = require('path');

const nextuiThemePath = path.dirname(require.resolve('@nextui-org/theme'));
const aiLabSourcePath = path.dirname(require.resolve('@luxrobo/ai-lab'));

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    // Scan the ai-lab package source so its classes are not purged.
    path.join(aiLabSourcePath, '**/*.{js,jsx,ts,tsx}'),
    // NextUI theme.
    path.join(nextuiThemePath, '**/*.{js,ts,jsx,tsx}'),
  ],
  // Brand/font/form design tokens shipped by the package.
  presets: [aiLabPreset],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: [nextui()],
};
