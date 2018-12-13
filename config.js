const path = require('path');
const gitRev = require('git-rev-sync');

const sourceDir = path.resolve(__dirname, './source');
const defaultNodeEnv = 'production';

module.exports = {
  sourceDir,
  assetsDir: path.resolve(__dirname, './assets'),
  buildDir: path.resolve(__dirname, './build'),
  e2eTestsDir: path.resolve(__dirname, './cypress'),
  sentryConfigFilePath:
    process.env.SENTRY_PROPERTIES_PATH ||
    path.resolve(__dirname, 'sentry.properties'),
  defaultNodeEnv,
  nodeEnv: process.env.NODE_ENV || defaultNodeEnv,
  devServerPort: process.env.PORT || 3000,
  api: process.env.ENVIRONMENT || 'production',
  isDebugEnabled: Boolean(process.env.DEBUG_ENABLED) || false,
  isAnalyzeModeEnabled: process.env.ANALYZE || false,
  areSourcemapsEnabled: Boolean(process.env.ENABLE_SOURCEMAPS),
  themeImportDeclaration: `@import "${sourceDir}/domains/app/config/styles/theme.css";`,
  globalStylesImportDeclaration: `@import "${sourceDir}/global.css";`,
  e2eTest: Boolean(process.env.E2E_TEST),
  release: gitRev.short(),
};
