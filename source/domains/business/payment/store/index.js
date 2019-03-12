// @flow
import { observable, computed, action, reaction, runInAction } from 'mobx';
import { createViewModel, type ViewModel } from '~/utils/create-view-model';
import { generateQrCode } from '~/utils/generate-qrcode';
import { paymentApi } from '~/domains/business/payment/api';
import { auth } from '~/domains/business/auth';
import { kyc } from '~/domains/business/kyc';

import type { SaleStore } from '~/domains/business/sale/store';
import * as PaymentMethodTypes from '~/domains/business/payment-method/types';

class PaymentStoreState {
  @observable
  selectedMethodId = null;

  @observable
  addressesByMethodId: Map<string, string> = new Map();

  @observable
  selectedMethodAddressQRCode: string = '';
}

export class PaymentStore {
  sale: SaleStore;

  @observable
  state: ViewModel<PaymentStoreState> = createViewModel(
    new PaymentStoreState(),
  );

  @computed
  get publicPrices(): { rate: number, label: string }[] {
    return this.sale.data.paymentMethods
      .filter((method) => method.id !== 'ERC20')
      .map(({ id, rate }) => ({
        rate,
        label: id,
      }));
  }

  @computed
  get selectedMethod(): ?PaymentMethodTypes.Data {
    return this.sale.data.paymentMethods.find(
      (method) => method.id === this.state.selectedMethodId,
    );
  }

  @computed
  get selectedMethodAddress(): ?string {
    return this.state.addressesByMethodId.get(
      this.state.selectedMethodId || '',
    );
  }

  constructor(options: {| sale: SaleStore |}) {
    this.sale = options.sale;
    this.reset();
    if (!options.sale) {
      return;
    }
    this.state.selectedMethodId = (this.sale.data.paymentMethods[0] || {}).id;

    // Load and set payment method address on selected method change or kyc change
    reaction(
      () => kyc.isAllowed && this.state.selectedMethodId,
      () => {
        this.loadCurrentMethod();
      },
    );

    reaction(
      () => auth.isAuthenticated,
      () => {
        if (!auth.isAuthenticated) {
          this.reset();
        }
      },
    );

    reaction(
      () => this.selectedMethodAddress,
      () => {
        this.updateQrCode();
      },
    );
  }

  @action
  loadCurrentMethod = async () => {
    if (!this.selectedMethod) {
      return;
    }

    const { id, token } = this.selectedMethod;

    if (!kyc.isAllowed || this.state.addressesByMethodId.get(id)) {
      return;
    }

    const data = await paymentApi.getPaymentAddress({
      saleId: this.sale.data.id,
      tokenId: token,
    });

    runInAction(() => {
      this.state.addressesByMethodId.set(id, data.address);
    });
  };

  @action
  updateQrCode = async () => {
    const address = this.selectedMethodAddress;

    if (!address) {
      return;
    }

    const generatedQrCode = await generateQrCode(address);

    runInAction(() => {
      this.state.selectedMethodAddressQRCode = generatedQrCode;
    });
  };

  @action
  setMethod = (methodId: PaymentMethodTypes.Id) => {
    this.state.selectedMethodId = methodId;
  };

  @action
  reset = () => {
    this.state.reset();
    this.state.addressesByMethodId = new Map();
  };
}
