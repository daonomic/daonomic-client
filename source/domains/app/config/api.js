// @flow
import { env } from '~/domains/app/config';

const productionApiUrl = 'https://api.daonomic.io/v1';
const productionKyberNetworkUrl = 'https://api.kyber.network';

export let baseApiUrl = productionApiUrl;
export let baseKyberNetworkUrl = productionKyberNetworkUrl;

switch (env) {
  case 'production': {
    baseApiUrl = productionApiUrl;
    baseKyberNetworkUrl = productionKyberNetworkUrl;
    break;
  }

  case 'staging': {
    baseApiUrl = 'https://dev-api.daonomic.io/v1';
    baseKyberNetworkUrl = 'https://ropsten-api.kyber.network';
    break;
  }

  case 'development': {
    baseApiUrl = 'http://ops:9091/v1';
    baseKyberNetworkUrl = 'https://ropsten-api.kyber.network';
    break;
  }

  default: {
    baseApiUrl = productionApiUrl;
    baseKyberNetworkUrl = productionKyberNetworkUrl;
    break;
  }
}
