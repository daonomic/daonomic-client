// @flow
import { environment } from '~/domains/app/config';

const productionApiUrl = 'https://api.daonomic.io/v1';

export let baseApiUrl = productionApiUrl;

switch (environment) {
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
    baseApiUrl = productionApiUrl;
    break;
  }
}
