const path = require('path');

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'production',
  isAnalyzeModeEnabled: process.env.ANALYZE || false,
  sourceDirPath: path.resolve(__dirname, '../source'),
  buildDirPath: path.resolve(__dirname, '../build'),
};
