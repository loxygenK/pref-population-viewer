const path = require("path");

function nextLintCommand(filenames) {
  const optionFileList = "--file " + filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ");

  return `next lint --fix ${optionFileList}`
}

module.exports = {
  "./src/**/*.{ts,tsx}": [
    nextLintCommand,
    "prettier -cw"
  ],
  "./cypress/integration/**/*.{ts,tsx}": [
    "prettier -cw"
  ],
}
