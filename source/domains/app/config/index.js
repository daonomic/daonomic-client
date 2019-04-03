// @flow

const globalDaonomicConfig = window.daonomicConfig || {};

export const environment: 'development' | 'staging' | 'production' =
  globalDaonomicConfig.environment || process.env.ENVIRONMENT;

const realms = {
  development: '5ca4906a020d887e48ea6e93',
  staging: '5c8fb92adfe5224664edfa11',
  production: '',
};

export const config = {
  realmId:
    globalDaonomicConfig.realm || realms[environment] || realms.production,
  contactEmail: 'dev@0v1se.com',
  termsOfServiceUrl: 'terms.url',
  daonomicUrl: 'https://daonomic.io',
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
  defaultPollingInterval: 3000,
};

export function actualizeRealmId() {
  if (globalDaonomicConfig.realm) {
    config.realmId = globalDaonomicConfig.realm;
  }
}
