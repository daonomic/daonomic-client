export const initialContextValue = {
  selectedPaymentMethod: null,
  isImmediatePurchaseAvailable: false,
  costPrecision: 6,
  ethRate: null,
  buyTokens: async () => {},
  getSellRateToEth: async () => {},
  loadBonus: async () => {},
  bonus: {
    dataState: 'idle',
  },
};
