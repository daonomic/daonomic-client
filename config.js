const path = require('path');

const sourceDir = path.resolve(__dirname, './source');

module.exports = {
  sourceDir,
  assetsDir: path.resolve(__dirname, './assets'),
  buildDir: path.resolve(__dirname, './build'),
  nodeEnv: process.env.NODE_ENV || 'production',
  api: process.env.API || 'production',
  clientApi: 'https://dev-api.daonomic.io/v1',
  isDebugEnabled: Boolean(process.env.DEBUG_ENABLED) || false,
  isAnalyzeModeEnabled: process.env.ANALYZE || false,
  themeImportDeclaration: `@import "${sourceDir}/config/styles/theme.css";`,
  globalStylesImportDeclaration: `@import "${sourceDir}/global.css";`,
};
