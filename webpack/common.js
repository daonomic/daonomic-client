const path = require('path');

const sourceDir = path.resolve(__dirname, '../source');

module.exports = {
  sourceDir,
  buildDir: path.resolve(__dirname, '../build'),
  nodeEnv: process.env.NODE_ENV || 'production',
  isAnalyzeModeEnabled: process.env.ANALYZE || false,
  themeImportDeclaration: `@import "${sourceDir}/config/styles/theme.css";`,
};
