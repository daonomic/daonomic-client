// @flow

import { tokenPurchaseService } from '~/domains/business/token-purchase/service';

import type { TokenExchangeCalculations } from '~/domains/business/token-exchange-calculations/store';
import type { TokenPurchase } from '~/domains/business/token-purchase/store';

export const createMakePurchase = ({
  tokenExchangeCalculations,
  tokenPurchase,
}: {|
  tokenExchangeCalculations: TokenExchangeCalculations,
  tokenPurchase: TokenPurchase,
|}) => async () => {
  const paymentMethod = tokenPurchase.selectedPaymentMethod;

  if (!paymentMethod) {
    throw new Error('No payment method selected');
  }

  const category = paymentMethod.category;

  let isPurchased = false;

  if (category === 'ETH') {
    isPurchased = await tokenPurchaseService.buyInEth({
      cost: tokenExchangeCalculations.state.cost,
    });
  } else if (category === 'ERC20') {
    isPurchased = await tokenPurchaseService.buyInErc20({
      cost: tokenExchangeCalculations.state.cost,
      paymentMethod: paymentMethod,
    });
  } else if (category === 'KYBER_NETWORK' || category === 'KYBER_NETWORK_ETH') {
    isPurchased = await tokenPurchaseService.buyInKyber({
      cost: tokenExchangeCalculations.state.cost,
      paymentMethod,
    });
  }

  if (isPurchased) {
    tokenPurchase.resetState({
      cost: tokenExchangeCalculations.state.cost,
      amount: tokenExchangeCalculations.state.amount,
      paymentMethod,
    });

    tokenExchangeCalculations.handleState(() => ({
      cost: 0,
      isHydrating: false,
      amount: 0,
      hasError: false,
    }));
  }
};
