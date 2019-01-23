// @flow

const globalDaonomicConfig = window.daonomicConfig || {};

export const environment: 'development' | 'staging' | 'production' =
  globalDaonomicConfig.environment || process.env.ENVIRONMENT;

const sales = {
  development: '5c3f00c6020d88686a94b389',
  staging: '5c3f00c6020d88686a94b389',
  production: '5c3f00c6020d88686a94b389',
};

const realms = {
  development: '5c3f00c6020d88686a94b386',
  staging: '5c3f00c6020d88686a94b386',
  production: '5c3f00c6020d88686a94b386',
};

export default {
  saleId: globalDaonomicConfig.sale || sales[environment] || sales.production,
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
};
