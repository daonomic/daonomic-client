// @flow

const globalDaonomicConfig = window.daonomicConfig || {};

export const environment: 'development' | 'staging' | 'production' =
  globalDaonomicConfig.environment || process.env.ENVIRONMENT;

const sales = {
  development: '5c0515f1020d882c8caacc30',
  staging: '5c0515f1020d882c8caacc30',
  production: '5c0515f1020d882c8caacc30',
};

const realms = {
  development: '5c0515f1020d882c8caacc2e',
  staging: '5c0515f1020d882c8caacc2e',
  production: '5c0515f1020d882c8caacc2e',
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
