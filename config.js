const path = require('path');

// eslint-disable-next-line
const gitRev = require('git-rev-sync');

const sourceDir = path.resolve(__dirname, './source');
const defaultNodeEnv = 'production';

const sentryConfigFile =
  process.env.SENTRY_PROPERTIES_PATH ||
  path.resolve(__dirname, 'sentry.properties');

module.exports = {
  paths: {
    sourceDir,
    assetsDir: path.resolve(sourceDir, './assets'),
    buildDir: path.resolve(__dirname, './build'),
    e2eTestsDir: path.resolve(__dirname, './cypress'),
    sentryConfigFile,
  },
  defaultNodeEnv,
  nodeEnv: process.env.NODE_ENV || defaultNodeEnv,
  devServerPort: process.env.PORT || 3000,
  api: process.env.ENVIRONMENT || 'production',
  isAnalyzeModeEnabled: process.env.ANALYZE || false,
  areSourcemapsEnabled: !!process.env.ENABLE_SOURCEMAPS,
  uploadSourceMapsToSentry: !!process.env.UPLOAD_SOURCEMAPS_TO_SENTRY,
  themeImportDeclaration: `@import "${sourceDir}/domains/app/config/styles/theme.css";`,
  globalStylesImportDeclaration: `@import "${sourceDir}/global.css";`,
  e2eTest: !!process.env.E2E_TEST,
  release: gitRev.short(),
};
