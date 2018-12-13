const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SentryCliPlugin = require('@sentry/webpack-plugin');
const baseConfig = require('./base.config');
const {
  themeImportDeclaration,
  sourceDir,
  buildDir,
  release,
  areSourcemapsEnabled,
  sentryConfigFilePath,
} = require('../config');
const theme = require('../theme.js');

const sourceMapsPlugins = [];

if (areSourcemapsEnabled) {
  sourceMapsPlugins.push(
    new SentryCliPlugin({
      include: buildDir,
      release,
      configFile: sentryConfigFilePath,
    }),
  );
}

module.exports = Object.assign({}, baseConfig, {
  mode: 'production',

  devtool: areSourcemapsEnabled ? 'source-map' : false,

  plugins: [
    ...baseConfig.plugins,
    new MiniCssExtractPlugin(),
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        output: {
          comments: false,
        },
      },
    }),
    ...sourceMapsPlugins,
  ],

  module: Object.assign({}, baseConfig.module, {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.css$/,
        include: [sourceDir, /daonomic\/ui/],
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
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
});
