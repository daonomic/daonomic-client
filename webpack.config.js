const { nodeEnv, defaultNodeEnv } = require('./config');

let config;

try {
  config = require(`./webpack/${nodeEnv}.config`);
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line no-console
  console.error(
    `Cannot find webpack config for ${nodeEnv} environment, using ${defaultNodeEnv} config as a fallback\n`,
  );
  config = require(`./webpack/${defaultNodeEnv}.config`);
}

module.exports = config;
