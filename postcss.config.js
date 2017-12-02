const postcssImport = require('postcss-import');
const createResolver = require('postcss-import-webpack-resolver');
const nesting = require('postcss-nesting');
const customMedia = require('postcss-custom-media');
const customProperties = require('postcss-custom-properties');
const calc = require('postcss-calc');
const colorFunction = require('postcss-color-function');
const flexbugsFixes = require('postcss-flexbugs-fixes');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const webpackConfig = require('./webpack/base.config');

module.exports = {
  plugins: [
    postcssImport({
      resolve: createResolver({
        alias: webpackConfig.resolve.alias,
      }),
    }),
    nesting(),
    customMedia(),
    customProperties(),
    calc(),
    colorFunction(),
    flexbugsFixes(),
    autoprefixer(),
    csso(),
  ],
};
