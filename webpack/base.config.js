const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const {
  paths,
  api,
  nodeEnv,
  areSourcemapsEnabled,
  isAnalyzeModeEnabled,
  e2eTest,
} = require('../config');

// eslint-disable-next-line no-console
console.log(
  'Starting build...\n',
  {
    api,
    nodeEnv,
    areSourcemapsEnabled,
    e2eTest,
  },
  '\n',
);

const config = {
  entry: {
    index: [
      'regenerator-runtime/runtime',
      `${paths.sourceDir}/index.js`,
      '@daonomic/ui/lib/global.css',
    ].concat(e2eTest ? `${paths.e2eTestsDir}/support/web3-mock/inject` : []),
  },

  output: {
    path: paths.buildDir,
    publicPath: '/',
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~': paths.sourceDir,
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [paths.sourceDir, /@daonomic\/ui/],
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
      template: `${paths.sourceDir}/index.html`,
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],

  stats: {
    children: false,
    modules: false,
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
        },
      },
    },
  },
};

if (isAnalyzeModeEnabled) {
  config.plugins = [...config.plugins, new BundleAnalyzerPlugin()];
}

if (areSourcemapsEnabled) {
  config.devtool = 'source-map';
}

module.exports = config;
