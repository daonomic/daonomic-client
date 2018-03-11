const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./base.config');
const { themeImportDeclaration } = require('../config');

const extractCSS = new ExtractTextPlugin('app.css');

module.exports = Object.assign({}, baseConfig, {
  plugins: [
    ...baseConfig.plugins,
    extractCSS,
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        output: {
          comments: false,
        },
      },
    }),
  ],

  module: Object.assign({}, baseConfig.module, {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.css$/,
        use: extractCSS.extract([
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]-[local]-[hash:base64:5]',
            },
          },
          'postcss-loader',
          {
            loader: 'webpack-append',
            query: themeImportDeclaration,
          },
        ]),
      },
    ],
  }),
});
