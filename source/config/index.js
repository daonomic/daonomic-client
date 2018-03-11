// @flow

const sales = {
  development: '0xaee0eb707a23fee852c43b5eb22030a25a729937',
  production: '0xf76350f0ad6b7cfce1311ef43e2eef488fd16dad',
};

const realms = {
  development: '5a6f813d1d20a7d7c95eacb0',
  production: '5a6f813d1d20a7d7c95eacb0',
};

export const realm: string = realms[process.env.API] || realms.production;
export const sale: string = sales[process.env.API] || sales.production;
export const tokenName = 'TIKR';
export const contactEmail = 'dev@0v1se.com';
export const termsOfServiceURL = 'terms.url';

export const faq = [
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
];

export const saleTimeline = [
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
];