window.config = Object.assign(window.config || {}, {
  sale: '0x99a09f0d85bc6e95e110348a8522f98443e31c4a',
  common: {
    contactEmail: 'support@domain',
    termsOfServiceURL: 'domain/terms',
  },
  faq: [
    {
      question: 'How Can I invest?',
      answer: 'Answer for the question',
    },
    {
      question: 'What do you already have?',
      answer: 'Answer for the question',
    },
    {
      question: 'Why we should trust you?',
      answer: 'Answer for the question',
    },
    {
      question: 'How collected funds will be used?',
      answer: 'Answer for the question',
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
});
