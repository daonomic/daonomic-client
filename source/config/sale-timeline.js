// @flow
export type TimelineStep = {
  date: string,
  text: string,
  percent: string,
  isActive: boolean,
};

export default [
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
