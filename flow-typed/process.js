// @flow
declare var process: {
  env: {
    ENVIRONMENT: 'production' | 'staging' | 'development',
    NODE_ENV: 'production' | 'development',
  },
};
