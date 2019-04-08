// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Panel } from '@daonomic/ui';
import { TwoColumnsLayout } from '~/components/two-columns-layout';
import { Heading } from '~/components/heading';
import { Kyc } from './components/kyc';
import { WalletBalanceProvider } from '~/providers/wallet-balance-provider';
import { PaymentMethod } from './components/payment-method-B';
import { TokenPrice } from './components/token-price';
import { Balance } from './components/balance';
import { BalanceOverview } from './components/balance-overview';
import { ReferralProgram } from './components/referral-program';
import { SalePeriodGuard } from './components/sale-period-guard';
import { Transactions } from './components/transactions';
import styles from './buy-tokens.css';

import type { TokenStore } from '~/domains/business/token/store';

export type Props = {|
  token: TokenStore,
  isLoaded: boolean,
  isKycAllowed: boolean,
  onMount(): void,
|};

function Error() {
  return (
    <TwoColumnsLayout
      left={
        <Panel>
          <Heading tagName="h1" className={styles.placeholder} size="large">
            <Trans>Something went wrong</Trans>
          </Heading>
        </Panel>
      }
      right={<Balance />}
    />
  );
}

function Loading() {
  return (
    <TwoColumnsLayout
      left={
        <Panel>
          <Heading tagName="h1" className={styles.placeholder} size="large">
            <Trans>Loading...</Trans>
          </Heading>
        </Panel>
      }
      right={<Balance />}
    />
  );
}

export class BuyTokensPageView extends React.Component<Props> {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { token } = this.props;

    switch (token.state.dataState) {
      case 'idle': {
        return <Error />;
      }

      case 'failed': {
        return <Error />;
      }

      case 'loading': {
        return <Loading />;
      }

      case 'loaded': {
        const { sale } = token;

        const renderedBalanceOverview = (
          <WalletBalanceProvider>
            {(state) => state.lockedBalance > 0 && <BalanceOverview />}
          </WalletBalanceProvider>
        );

        if (sale) {
          return (
            <TwoColumnsLayout
              left={
                <React.Fragment>
                  <Kyc />

                  {this.props.isKycAllowed && (
                    <SalePeriodGuard
                      startDate={sale.data.startDate}
                      endDate={sale.data.endDate}
                      renderContent={() => <PaymentMethod sale={sale} />}
                    />
                  )}
                  {renderedBalanceOverview}
                  {this.props.isKycAllowed && <Transactions />}
                </React.Fragment>
              }
              right={
                <React.Fragment>
                  <Balance />
                  <TokenPrice tokenSymbol={token.symbol} sale={sale} />
                  <ReferralProgram />
                </React.Fragment>
              }
            />
          );
        } else {
          return (
            <TwoColumnsLayout
              left={
                <React.Fragment>
                  <Kyc />
                  {renderedBalanceOverview}
                  {this.props.isKycAllowed && <Transactions />}
                </React.Fragment>
              }
              right={
                <React.Fragment>
                  <Balance />
                  <ReferralProgram />
                </React.Fragment>
              }
            />
          );
        }
      }

      default: {
        (token.state.dataState: empty);
        return <Error />;
      }
    }
  }
}
