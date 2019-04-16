// @flow

import * as React from 'react';
import { compose } from 'ramda';
import { observer, inject } from 'mobx-react';
import { paymentService } from '~/domains/business/payment/service';
import { PaymentMethodAddressView } from './view';
import { withMarkerTreeProvider } from '~/providers/marker-tree';
import { logger } from '~/domains/app/logger';
import { generateQrCode } from '~/utils/generate-qrcode';

import type { TokenPurchase } from '~/domains/business/token-purchase/store';
import type { TokenStore } from '~/domains/business/token/store';

type State = {
  qrCode: ?string,
  fundAddress: ?string,
  isHydrating: boolean,
  error: ?Error,
};

type Props = {|
  saleId: ?string,
  paymentMethodAddress: ?string,
  paymentMethodSymbol: ?string,
|};

class PaymentMethodAddressClass extends React.PureComponent<Props, State> {
  state = {
    qrCode: null,
    fundAddress: null,
    isHydrating: false,
    error: null,
  };

  componentDidMount() {
    this.generateQrCode();
    this.fetchFundAddress();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.paymentMethodAddress !== this.props.paymentMethodAddress) {
      this.generateQrCode();
      this.fetchFundAddress();
    }
  }

  asyncSetState = (args: any): Promise<void> =>
    new Promise((resolve) => this.setState(args, resolve));

  generateQrCode = async (): Promise<void> => {
    try {
      const { paymentMethodAddress } = this.props;

      if (!paymentMethodAddress) {
        throw new Error("Can't find payment method address");
      }

      await generateQrCode(paymentMethodAddress).then((qrCode) => {
        this.setState({
          qrCode,
        });
      });
    } catch (error) {
      await this.asyncSetState({
        error,
      });

      await logger.logError(error);
    }
  };

  fetchFundAddress = async (): Promise<void> => {
    try {
      const { saleId, paymentMethodAddress } = this.props;

      if (!saleId) {
        throw new Error("Can't find sale identifier");
      }

      if (!paymentMethodAddress) {
        throw new Error("Can't find payment method address");
      }

      await this.asyncSetState({
        isHydrating: true,
      });

      const response = await paymentService.fetchFundAddress({
        saleId,
        paymentAddress: paymentMethodAddress,
      });

      if (!response.address) {
        throw new Error("Can't fetch address for this payment method");
      }

      await this.asyncSetState({
        isHydrating: false,
        fundAddress: response.address,
      });
    } catch (error) {
      await this.asyncSetState({
        error,
      });

      await logger.logError(error);
    }
  };

  render() {
    return (
      <PaymentMethodAddressView
        qrCode={this.state.qrCode}
        error={this.state.error}
        fundAddress={this.state.fundAddress}
        isHydrating={this.state.isHydrating}
        paymentMethodSymbol={this.props.paymentMethodSymbol}
        paymentMethodAddress={this.props.paymentMethodAddress}
      />
    );
  }
}

const getPaymentMethodSymbol = (tokenPurchase: TokenPurchase): ?string => {
  const method = tokenPurchase.selectedPaymentMethod;

  if (!method) return null;

  return method.id;
};

const getPaymentMethodAddress = (tokenPurchase: TokenPurchase): ?string => {
  const method = tokenPurchase.selectedPaymentMethod;

  if (!method) return null;

  return method.token;
};

const enhance = compose(
  withMarkerTreeProvider('payment-method-address'),
  inject(
    ({
      tokenPurchase,
      token,
    }: {|
      tokenPurchase: TokenPurchase,
      token: TokenStore,
    |}) => ({
      paymentMethodSymbol: getPaymentMethodSymbol(tokenPurchase),
      paymentMethodAddress: getPaymentMethodAddress(tokenPurchase),
      saleId: token.saleId,
    }),
  ),
  observer,
);

export const PaymentMethodAddress: React.ComponentType<mixed> = enhance(
  PaymentMethodAddressClass,
);
