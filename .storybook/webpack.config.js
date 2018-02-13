const path = require('path');
const { sourceDir, themeImportDeclaration, globalStylesImportDeclaration } = require('../config');
const postcssLoaderOptions = require('../postcss.config');
const webpackConfig = require('../webpack.config');

module.exports = {
  resolve: webpackConfig.resolve,

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          sourceDir,
          /@daonomic\/ui/,
        ],
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: [
          sourceDir,
          /@daonomic\/ui/,
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]-[local]-[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: postcssLoaderOptions,
          },
          {
            loader: 'webpack-append',
            query: globalStylesImportDeclaration,
          },
          {
            loader: 'webpack-append',
            query: themeImportDeclaration,
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          mimetype: 'image/svg+xml',
        },
      },
    ],
  },
};
