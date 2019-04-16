// @flow

import * as React from 'react';
import debounce from 'debounce-fn';
import { inject, observer } from 'mobx-react';
import { compose } from 'ramda';
import { logger } from '~/domains/app/logger';
import { AmountInputView } from './view';
import { tokenExchangeCalculationsService } from '~/domains/business/token-exchange-calculations/service';

import type { TokenPurchase } from '~/domains/business/token-purchase/store';
import type { TokenStore } from '~/domains/business/token/store';
import type { TokenExchangeCalculations } from '~/domains/business/token-exchange-calculations/store';

const enhance = compose(
  inject(
    ({
      tokenExchangeCalculations,
      tokenPurchase,
      token,
    }: {|
      tokenExchangeCalculations: TokenExchangeCalculations,
      tokenPurchase: TokenPurchase,
      token: TokenStore,
    |}) => {
      const debounceRecalculate = debounce(
        async ({
          prevAmount,
          prevCost,
        }: {|
          prevAmount: number,
          prevCost: number,
        |}) => {
          const sale = token.sale;

          if (!sale) {
            throw new Error('No sale provided for calculations');
          }

          const paymentMethod = tokenPurchase.selectedPaymentMethod;

          if (!paymentMethod) {
            throw new Error('No payment method choosen');
          }

          tokenExchangeCalculations.handleState((state) => ({
            ...state,
            isHydrating: true,
            hasError: false,
          }));

          const costAndAmound = await tokenExchangeCalculationsService.calculateCostAndAmount(
            {
              sale,
              paymentMethod,
              prevAmount,
              prevCost,
            },
          );

          tokenExchangeCalculations.handleState(() => ({
            ...costAndAmound,
            isHydrating: false,
            hasError: false,
          }));
        },
        {
          wait: 800,
        },
      );

      return {
        cost: tokenExchangeCalculations.state.cost,
        amount: tokenExchangeCalculations.state.amount,
        isHydrating: tokenExchangeCalculations.state.isHydrating,
        tokenSymbol: token.symbol,
        paymentMethod: tokenPurchase.selectedPaymentMethod,
        onChange: (event: SyntheticInputEvent<HTMLSelectElement>) => {
          try {
            const prevCost = tokenExchangeCalculations.state.cost;
            const prevAmount = tokenExchangeCalculations.state.amount;

            tokenExchangeCalculations.handleState((state) => ({
              ...state,
              amount: +event.target.value,
            }));

            debounceRecalculate({
              prevCost,
              prevAmount,
            });
          } catch (error) {
            tokenExchangeCalculations.handleState((state) => ({
              ...state,
              hasError: true,
            }));

            logger.logError(error);
          }
        },
      };
    },
  ),
  observer,
);

export const AmountInput: React.ComponentType<{}> = enhance(AmountInputView);
