// @flow

const productionApiUrl = 'https://api.daonomic.io/v1';

export let baseApiUrl = productionApiUrl;

switch (process.env.API) {
  case 'production': {
    baseApiUrl = productionApiUrl;
    break;
  }

  case 'staging': {
    baseApiUrl = 'https://dev-api.daonomic.io/v1';
    break;
  }

  case 'development': {
    baseApiUrl = 'http://ops:9091/v1';
    break;
  }

  default: {
    (process.env.API: empty);
  }
}
