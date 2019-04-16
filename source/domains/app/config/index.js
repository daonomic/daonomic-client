// @flow

const defaultConfig = window.daonomicConfig || {};

type Environment = 'development' | 'staging' | 'production';

export const env: Environment = defaultConfig.env || process.env.ENVIRONMENT;

const realms = {
  development: '5cb07dd6020d881a054130ad',
  staging: '5c8fb92adfe5224664edfa11',
  production: '',
};

const web3AppNodeUrls = {
  development: 'http://ops:9092/v1/node',
  staging: 'https://dev-app.daonomic.io/v1/node',
  production: 'https://app.daonomic.io/v1/node',
};

class Config {
  realmId = defaultConfig.realm || realms[env] || realms.production;
  contactEmail = 'dev@0v1se.com';
  termsOfServiceUrl = 'terms.url';
  daonomicUrl = 'https://daonomic.io';
  sentryDsn = 'https://0e3f2eb6dbc24f62b7e78dd20da897b4@sentry.io/1437614';
  kyberNetworkTerms = 'https://files.kyber.network/tac.html';
  kyberWidgetUrl = 'https://kyber.daonomic.io';
  web3AppNodeUrl = web3AppNodeUrls[env];
  defaultPollingInterval = 3000;

  actualizeRealmId = () => {
    if (defaultConfig.realm) {
      this.realmId = defaultConfig.realm;
    }
  };
}

export const config = new Config();
