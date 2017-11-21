const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const {
  sourceDirPath,
  buildDirPath,
  nodeEnv,
  isAnalyzeModeEnabled,
} = require('./common');

const config = {
  entry: [
    `${sourceDirPath}/polyfills.js`,
    `${sourceDirPath}/index.js`,
    `${sourceDirPath}/global.css`,
  ],

  output: {
    path: path.resolve(__dirname, buildDirPath),
    publicPath: '/',
    filename: 'app.js',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~': sourceDirPath,
    },
    plugins: [
      new DirectoryNamedWebpackPlugin({
        honorIndex: true,
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          mimetype: 'image/png',
        },
      },
      {
        test: /\.gif$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          mimetype: 'image/gif',
        },
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          mimetype: 'image/svg+xml',
        },
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          mimetype: 'image/jpg',
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    }),
    new HtmlWebpackPlugin({
      template: `${sourceDirPath}/index.html`,
      hash: true,
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
};

if (isAnalyzeModeEnabled) {
  config.plugins = [
    ...config.plugins,
    new BundleAnalyzerPlugin(),
  ];
}

module.exports = config;
