// @flow
import * as React from 'react';
import { Panel } from '@daonomic/ui';
import TwoColumnsLayout from '~/components/two-columns-layout';
import Heading from '~/components/heading';
import Kyc from './components/kyc';
import PaymentMethod from './components/payment-method';
import TokenPrice from './components/token-price';
import Balance from './components/balance';
import styles from './buy-tokens.css';
import formatDate from '~/i18n/format-date';
import { getTranslation } from '~/i18n';

export type Props = {|
  isLoaded: boolean,
  isAllowedToPay: boolean,
  sale: {
    isStarted: boolean,
    isFinished: boolean,
    startTimestamp: ?number,
    endTimestamp: ?number,
  },
|};

export default class BuyTokensPageView extends React.Component<Props> {
  renderPaymentMethod = () => {
    if (!this.props.isAllowedToPay) {
      return null;
    }

    return <PaymentMethod />;
  };

  renderPreloader = () => (
    <Panel>
      <Heading tagName="h1" className={styles.placeholder} size="large">
        {getTranslation('common:loading')}...
      </Heading>
    </Panel>
  );

  renderActiveSaleContent = () => (
    <React.Fragment>
      <Kyc />
      {this.renderPaymentMethod()}
    </React.Fragment>
  );

  renderNotStartedSaleContent = () => {
    const { startTimestamp } = this.props.sale;

    if (!startTimestamp) {
      return null;
    }

    return (
      <Panel>
        <Heading tagName="h1" className={styles.placeholder} size="normal">
          {getTranslation('widgets:saleStarts', {
            date: formatDate(new Date(startTimestamp)),
          })}
        </Heading>
      </Panel>
    );
  };

  renderFinishedSaleContent = () => (
    <Panel>
      <Heading tagName="h1" className={styles.placeholder} size="normal">
        {getTranslation('widgets:saleFinished')}
      </Heading>
    </Panel>
  );

  renderContent = () => {
    const { isLoaded } = this.props;
    const { isStarted, isFinished } = this.props.sale;

    if (!isLoaded) {
      return this.renderPreloader();
    }

    if (!isStarted) {
      return this.renderNotStartedSaleContent();
    }

    if (isStarted && !isFinished) {
      return this.renderActiveSaleContent();
    }

    return this.renderFinishedSaleContent();
  };

  render() {
    return (
      <TwoColumnsLayout>
        <TwoColumnsLayout.Left>{this.renderContent()}</TwoColumnsLayout.Left>

        <TwoColumnsLayout.Right>
          <Balance />
          <TokenPrice />
        </TwoColumnsLayout.Right>
      </TwoColumnsLayout>
    );
  }
}
