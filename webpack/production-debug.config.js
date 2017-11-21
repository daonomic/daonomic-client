const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./base.config');

const extractCSS = new ExtractTextPlugin('app.css');

module.exports = {
  ...baseConfig,

  devtool: 'source-map',

  plugins: [
    ...baseConfig.plugins,
    extractCSS,
  ],

  module: {
    ...baseConfig.module,
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
        ]),
      },
    ],
  },
};
