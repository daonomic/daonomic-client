// @flow
declare var process: {
  env: {
    API: 'production' | 'staging' | 'development',
    NODE_ENV: string,
  },
};
