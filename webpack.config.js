const { NODE_ENV = 'development' } = process.env;

let config;

try {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  config = require(`./webpack/${NODE_ENV}.config`);
} catch (error) {
  console.error(`Cannot find webpack config for ${NODE_ENV} environment, using base config as a fallback\n`);
  // eslint-disable-next-line import/no-dynamic-require, global-require
  config = require('./webpack/base.config');
}

module.exports = config;
