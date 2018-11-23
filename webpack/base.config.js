const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const {
  api,
  sourceDir,
  buildDir,
  e2eTestsDir,
  nodeEnv,
  isDebugEnabled,
  isAnalyzeModeEnabled,
  e2eTest,
} = require('../config');

// eslint-disable-next-line no-console
console.log(
  'Starting build...\n',
  {
    api,
    nodeEnv,
    isDebugEnabled,
    e2eTest,
  },
  '\n',
);

const config = {
  entry: [
    'regenerator-runtime/runtime',
    `${sourceDir}/index.js`,
    '@daonomic/ui/lib/global.css',
  ].concat(e2eTest ? `${e2eTestsDir}/support/web3-mock/inject` : []),

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
        include: [sourceDir, /@daonomic\/ui/],
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
      'process.env.ENVIRONMENT': JSON.stringify(api),
      'process.env.E2E_TEST': JSON.stringify(e2eTest),
    }),
    new HtmlWebpackPlugin({
      template: `${sourceDir}/index.html`,
      hash: true,
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],

  stats: {
    children: false,
    modules: false,
  },
};

if (isAnalyzeModeEnabled) {
  config.plugins = [...config.plugins, new BundleAnalyzerPlugin()];
}

if (isDebugEnabled) {
  config.devtool = 'source-map';
}

module.exports = config;
