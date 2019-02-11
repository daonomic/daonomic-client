const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SentryCliPlugin = require('@sentry/webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
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

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(
  Object.assign({}, baseConfig, {
    mode: 'production',

    devtool: areSourcemapsEnabled ? 'source-map' : false,

    plugins: [
      ...baseConfig.plugins,
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].css',
      }),
      ...sourceMapsPlugins,
    ],

    module: Object.assign({}, baseConfig.module, {
      rules: [
        ...baseConfig.module.rules,
        {
          test: /\.css$/,
          include: [paths.sourceDir, /daonomic\/ui/],
          exclude: [paths.assetsDir],
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
  }),
);
