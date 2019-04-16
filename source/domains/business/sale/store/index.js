// @flow
import { observable, computed } from 'mobx';

import * as SaleTypes from '~/domains/business/sale/types';
import * as PaymentTypes from '~/domains/business/payment/types';

export class SaleStore {
  @observable
  data: SaleTypes.Data;

  @computed
  get notLimited() {
    return !this.data.total;
  }

  @computed
  get isStarted(): boolean {
    const { startDate } = this.data;

    if (startDate) {
      return startDate <= Date.now();
    }
    return true;
  }

  @computed
  get address(): string {
    return this.data.address;
  }

  @computed
  get isFinished(): boolean {
    if (this.data.endDate) {
      return this.data.endDate <= Date.now();
    }
    return false;
  }

  @computed
  get paymentMethods(): ?(PaymentTypes.PaymentServicePaymentMethod[]) {
    if (this.data && this.data.paymentMethods) {
      return this.data.paymentMethods;
    }
    return null;
  }

  @computed
  get defaultPaymentMethod(): ?PaymentTypes.PaymentServicePaymentMethod {
    const methods = this.paymentMethods;

    if (methods) {
      return methods.find((method) => method.default);
    }

    return null;
  }

  constructor({ data }: {| data: SaleTypes.Data |}) {
    this.data = data;
  }
}

export function createSaleStore(data: SaleTypes.Data): SaleStore {
  return new SaleStore({ data });
}
