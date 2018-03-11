const webpack = require('webpack');
const baseConfig = require('./base.config');
const {
  devServerPort,
  assetsDir,
  themeImportDeclaration,
} = require('../config');

module.exports = Object.assign({}, baseConfig, {
  entry: [
    `webpack-dev-server/client?http://localhost:${devServerPort}`,
    'webpack/hot/only-dev-server',

    ...baseConfig.entry,
  ],

  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  module: Object.assign({}, baseConfig.module, {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.css$/,
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
          'postcss-loader',
          {
            loader: 'webpack-append',
            query: themeImportDeclaration,
          },
        ],
      },
    ],
  }),

  devServer: {
    host: 'localhost',
    port: devServerPort,
    historyApiFallback: true,
    hot: true,
    contentBase: assetsDir,
  },
});
