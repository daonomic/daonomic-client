// @flow

const globalDaonomicConfig = window.daonomicConfig || {};

export const environment =
  globalDaonomicConfig.environment || process.env.ENVIRONMENT;

const sales = {
  development: '5adb5c52020d8831579b0c84',
  staging: '0xd76bdd62ed8cd391b9d69e27c60408a13d2b65f0',
  production: '0xf76350f0ad6b7cfce1311ef43e2eef488fd16dad',
};

const realms = {
  development: '5adb5c52020d8831579b0c83',
  staging: '5ac3910ddfe522538316ae6f',
  production: '5a6f813d1d20a7d7c95eacb0',
};

export default {
  saleId: globalDaonomicConfig.sale || sales[environment] || sales.production,
  realmId:
    globalDaonomicConfig.realm || realms[environment] || realms.production,
  tokenName: 'TIKR',
  contactEmail: 'dev@0v1se.com',
  termsOfServiceURL: 'terms.url',
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
  saleTimeline: [
    {
      title: 'Sale Timeline:',
      steps: [
        {
          date: '21 Jul',
          text: '1 Token Coin = 30 BTC',
          percent: '30%',
          isActive: false,
        },
        {
          date: '21 Aug',
          text: '1 Token Coin = 40 BTC',
          percent: '20%',
          isActive: false,
        },
        {
          date: '21 Sep',
          text: '1 Token Coin = 50 BTC',
          percent: '10%',
          isActive: true,
        },
        {
          date: '21 Oct',
          text: '1 Token Coin = 40 BTC',
          percent: '5%',
          isActive: false,
        },
      ],
    },
  ],
};
