const webpack = require('webpack');
const baseConfig = require('./base.config');
const {
  devServerPort,
  sourceDir,
  assetsDir,
  themeImportDeclaration,
} = require('../config');
const theme = require('../theme.js');

module.exports = Object.assign({}, baseConfig, {
  mode: 'development',

  entry: [
    `webpack-dev-server/client?http://localhost:${devServerPort}`,
    'webpack/hot/only-dev-server',

    ...baseConfig.entry,
  ],

  plugins: [...baseConfig.plugins, new webpack.HotModuleReplacementPlugin()],

  module: Object.assign({}, baseConfig.module, {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.css$/,
        include: [sourceDir, /daonomic\/ui/],
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
      {
        test: /\.less$/,
        exclude: [sourceDir, /daonomic\/ui/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: theme,
            },
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
