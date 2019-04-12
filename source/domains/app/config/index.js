// @flow

const globalDaonomicConfig = window.daonomicConfig || {};

export const environment: 'development' | 'staging' | 'production' =
  globalDaonomicConfig.environment || process.env.ENVIRONMENT;

const realms = {
  development: '5caf39e8020d886df228a94e',
  staging: '5c8fb92adfe5224664edfa11',
  production: '',
};

export const config = {
  realmId:
    globalDaonomicConfig.realm || realms[environment] || realms.production,
  contactEmail: 'dev@0v1se.com',
  termsOfServiceUrl: 'terms.url',
  daonomicUrl: 'https://daonomic.io',
  sentryDsn: 'https://0e3f2eb6dbc24f62b7e78dd20da897b4@sentry.io/1437614',
  kyberNetworkTerms: 'https://files.kyber.network/tac.html',
  faq: [
    {
      question: 'How Can I invest?',
      answer:
        'Answer with <abbr title="HyperText Markup Language">HTML</abbr> support',
    },
    {
      question: 'What do you already have?',
      answer: 'Answer',
    },
    {
      question: 'Why we should trust you?',
      answer: 'Answer',
    },
    {
      question: 'How collected funds will be used?',
      answer: 'Answer',
    },
  ],
  kyberWidgetUrl: 'https://kyber.daonomic.io',
  web3AppNodeUrl: 'http://ops:9092/v1/node',
  defaultPollingInterval: 3000,
};

export function actualizeRealmId() {
  if (globalDaonomicConfig.realm) {
    config.realmId = globalDaonomicConfig.realm;
  }
}
