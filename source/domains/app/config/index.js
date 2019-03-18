// @flow

const globalDaonomicConfig = window.daonomicConfig || {};

export const environment: 'development' | 'staging' | 'production' =
  globalDaonomicConfig.environment || process.env.ENVIRONMENT;

const realms = {
  development: '5c8faa9c020d882761654f1d',
  staging: '5c8faa9c020d882761654f1d',
  production: '5c8faa9c020d882761654f1d',
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
