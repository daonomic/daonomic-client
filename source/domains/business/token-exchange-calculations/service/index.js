// @flow

import { paymentService } from '~/domains/business/payment/service';
import { tokenExchangeCalculations as tokenExchangeCalculationsStore } from '~/domains/business/token-exchange-calculations/store';
import { logger } from '~/domains/app/logger';

import type { ITokenExchangeCalculationsService as IService } from './types';

class TokenExchangeCalculationsService implements IService {
  calculateCostAndAmount = async ({ sale, paymentMethod, prevCost }) => {
    const { amount, cost } = tokenExchangeCalculationsStore.state;

    const category = paymentMethod.category;
    const saleId = sale.data.id;

    try {
      let rate = paymentMethod.rate;

      if (['KYBER_NETWORK', 'KYBER_NETWORK_ETH'].indexOf(category) !== -1) {
        const rateResponse = await paymentService.fetchRate(
          {
            address: paymentMethod.token,
            amount,
          },
          saleId,
        );

        if (!rateResponse.rate) {
          throw new Error('Cant make request now');
        }
        rate = rateResponse.rate;
      }

      if (cost !== prevCost) {
        return {
          amount: cost * rate,
          cost: cost,
        };
      } else {
        return {
          amount: amount,
          cost: amount / rate,
        };
      }
    } catch (error) {
      logger.logError(error);

      return false;
    }
  };
}

export const tokenExchangeCalculationsService = new TokenExchangeCalculationsService();
