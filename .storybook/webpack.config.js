const path = require('path');
const SOURCE_PATH = path.resolve(__dirname, '../source');
const webpackConfig = require('../webpack/base.config');

module.exports = {
  resolve: webpackConfig.resolve,

  module: {
    rules: [
      {
        test: /\.css$/,
        include: SOURCE_PATH,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]-[local]-[hash:base64:5]',
            }
          },
          'postcss-loader'
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
