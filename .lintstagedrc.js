const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

//prettier --write --ignore-path .gitignore './**/*.{js,jsx,ts,tsx,json,css}'
module.exports = {
  "*.{js,jsx,ts,tsx,json,css}": ["prettier --write --ignore-path .gitignore"],
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
};
