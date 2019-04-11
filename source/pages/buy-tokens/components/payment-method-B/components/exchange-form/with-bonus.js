// @flow
import * as React from 'react';
import raven from 'raven-js';
import { paymentService } from '~/domains/business/payment';

import * as DataStateTypes from '~/domains/data/data-state/types';

type State = {|
  bonus: DataStateTypes.LoadableData<number>,
  hasError: boolean,
|};

export type BonusProps = {|
  loadBonus: (amount: number) => void,
  bonus: DataStateTypes.LoadableData<number>,
  saleAddress: string,
|};

type ExternalProps = {|
  saleAddress: string,
|};

export const withBonus = (Component: React.ComponentType<BonusProps>) =>
  class ComponentWithBonus extends React.PureComponent<ExternalProps, State> {
    state = {
      hasError: false,
      bonus: {
        dataState: 'idle',
      },
    };

    loadBonus = (amount: number): void => {
      this.setState(
        {
          bonus: {
            dataState: 'loading',
          },
        },
        async () => {
          try {
            const bonus = await paymentService.determineBonus({
              amount,
              saleId: this.props.saleAddress,
            });

            this.setState({
              bonus: {
                dataState: 'loaded',
                data: bonus,
              },
            });
          } catch (error) {
            this.setState(
              {
                bonus: {
                  dataState: 'failed',
                },
              },
              () => {
                raven.captureBreadcrumb({
                  message: 'Calculating bonus for exchange form',
                });
                raven.captureException(error);
              },
            );
          }
        },
      );
    };

    render() {
      const { bonus } = this.state;

      return (
        <Component {...this.props} loadBonus={this.loadBonus} bonus={bonus} />
      );
    }
  };
