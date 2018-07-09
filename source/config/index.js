// @flow

const globalDaonomicConfig = window.daonomicConfig || {};

export const environment: 'development' | 'staging' | 'production' =
  globalDaonomicConfig.environment || process.env.ENVIRONMENT;

const sales = {
  development: '5b4330e0020d8805e8a79257',
  staging: '0xd76bdd62ed8cd391b9d69e27c60408a13d2b65f0',
  production: '0xf76350f0ad6b7cfce1311ef43e2eef488fd16dad',
};

const realms = {
  development: '5b4330e0020d8805e8a79255',
  staging: '5ac3910ddfe522538316ae6f',
  production: '5a6f813d1d20a7d7c95eacb0',
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
};
