const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SentryCliPlugin = require('@sentry/webpack-plugin');
const baseConfig = require('./base.config');
const {
  paths,
  themeImportDeclaration,
  release,
  areSourcemapsEnabled,
  uploadSourceMapsToSentry,
} = require('../config');
const theme = require('../theme.js');

const sourceMapsPlugins = [];

if (areSourcemapsEnabled && uploadSourceMapsToSentry) {
  sourceMapsPlugins.push(
    new SentryCliPlugin({
      include: paths.buildDir,
      release,
      configFile: paths.sentryConfigFile,
    }),
  );
}

module.exports = Object.assign({}, baseConfig, {
  mode: 'production',

  devtool: areSourcemapsEnabled ? 'source-map' : false,

  plugins: [
    ...baseConfig.plugins,
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
    }),
    new UglifyJsPlugin({
      sourceMap: areSourcemapsEnabled,
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
        include: [paths.sourceDir, /daonomic\/ui/],
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
        exclude: [paths.sourceDir, /daonomic\/ui/],
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
