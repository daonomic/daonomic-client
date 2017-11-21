import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import TwoColumnsLayout from '~/components/two-columns-layout';
import SaleTimeline from '~/components/sale-timeline';
import EthereumWallet from './components/ethereum-wallet';
import PaymentMethod from './components/payment-method';
import TokenPrice from './components/token-price';
import Balance from './components/balance';

@inject(({ walletAddress }) => ({
  isWalletSaved: walletAddress.isSaved,
}))
@observer
class BuyTokens extends Component {
  static propTypes = {
    isWalletSaved: PropTypes.bool.isRequired,
  };

  renderPaymentMethod = () => {
    const { isWalletSaved } = this.props;

    if (!isWalletSaved) {
      return null;
    }

    return (
      <PaymentMethod />
    );
  };

  render() {
    return (
      <TwoColumnsLayout>
        <TwoColumnsLayout.Left>
          <EthereumWallet />
          {this.renderPaymentMethod()}
        </TwoColumnsLayout.Left>

        <TwoColumnsLayout.Right>
          <Balance />
          <TokenPrice />
          <SaleTimeline />
        </TwoColumnsLayout.Right>
      </TwoColumnsLayout>
    );
  }
}

export default BuyTokens;
