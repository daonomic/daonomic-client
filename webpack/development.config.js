const glob = require('glob');
const webpack = require('webpack');
const baseConfig = require('./base.config');
const { sourceDir, themeImportDeclaration } = require('./common');

module.exports = {
  ...baseConfig,

  devtool: 'source-map',

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',

    ...glob.sync(`${sourceDir}/config/global/**/*.js`),
    ...baseConfig.entry,
  ],

  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  module: {
    ...baseConfig.module,
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
  },

  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
};
