const postcssImport = require('postcss-import');
const createResolver = require('postcss-import-webpack-resolver');
const cssnext = require('postcss-cssnext');
const csso = require('postcss-csso');
const webpackConfig = require('./webpack/base.config');

module.exports = {
  plugins: [
    postcssImport({
      resolve: createResolver({
        alias: webpackConfig.resolve.alias,
      }),
    }),
    cssnext(),
    csso(),
  ],
};
