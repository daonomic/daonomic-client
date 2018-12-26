// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Panel } from '@daonomic/ui';
import TwoColumnsLayout from '~/components/two-columns-layout';
import { Heading } from '~/components/heading';
import Kyc from './components/kyc';
import PaymentMethod from './components/payment-method';
import TokenPrice from './components/token-price';
import Balance from './components/balance';
import { ReferralProgram } from './components/referral-program';
import { SalePeriodGuard } from './components/sale-period-guard';
import styles from './buy-tokens.css';

export type Props = {|
  isLoaded: boolean,
  isAllowedToPay: boolean,
  sale: {
    isStarted: boolean,
    isFinished: boolean,
    startTimestamp: ?number,
    endTimestamp: ?number,
  },
  onMount(): void,
|};

export default class BuyTokensPageView extends React.Component<Props> {
  componentDidMount() {
    this.props.onMount();
  }

  renderPreloader = () => (
    <Panel>
      <Heading tagName="h1" className={styles.placeholder} size="large">
        <Trans>Loading...</Trans>
      </Heading>
    </Panel>
  );

  renderContent = () => {
    const { isLoaded } = this.props;

    if (!isLoaded) {
      return this.renderPreloader();
    }

    return (
      <React.Fragment>
        <Kyc />
        {this.props.isAllowedToPay && (
          <SalePeriodGuard
            startTimestamp={this.props.sale.startTimestamp}
            endTimestamp={this.props.sale.endTimestamp}
            renderContent={() => <PaymentMethod />}
          />
        )}
      </React.Fragment>
    );
  };

  render() {
    return (
      <TwoColumnsLayout>
        <TwoColumnsLayout.Left>{this.renderContent()}</TwoColumnsLayout.Left>

        <TwoColumnsLayout.Right>
          <Balance />
          <TokenPrice />
          <ReferralProgram />
        </TwoColumnsLayout.Right>
      </TwoColumnsLayout>
    );
  }
}
