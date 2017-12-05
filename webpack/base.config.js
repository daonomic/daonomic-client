const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const {
  api,
  sourceDir,
  buildDir,
  nodeEnv,
  isDebugEnabled,
  isAnalyzeModeEnabled,
} = require('./common');

const config = {
  entry: [
    `${sourceDir}/polyfills.js`,
    `${sourceDir}/index.js`,
    `${sourceDir}/global.css`,
  ],

  output: {
    path: buildDir,
    publicPath: '/',
    filename: 'app.js',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~': sourceDir,
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          sourceDir,
          /daonomic-ui/,
        ],
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
      'process.env.API': JSON.stringify(api),
    }),
    new HtmlWebpackPlugin({
      template: `${sourceDir}/index.html`,
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

if (isDebugEnabled) {
  config.devtool = 'source-map';
}

module.exports = config;
