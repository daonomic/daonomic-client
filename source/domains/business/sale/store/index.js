// @flow
import { observable, computed } from 'mobx';
import { PaymentStore } from '~/domains/business/payment/store';

import * as SaleTypes from '~/domains/business/sale/types';

export class SaleStore {
  @observable
  data: SaleTypes.Data;

  @observable
  payment: PaymentStore;

  @computed
  get notLimited() {
    return !this.data.total;
  }

  @computed
  get isStarted(): boolean {
    if (this.data.startDate) {
      return this.data.startDate <= Date.now();
    } else {
      return true;
    }
  }

  @computed
  get isFinished(): boolean {
    if (this.data.endDate) {
      return this.data.endDate <= Date.now();
    } else {
      return false;
    }
  }

  constructor({ data }: {| data: SaleTypes.Data |}) {
    this.data = data;
    this.payment = new PaymentStore({ sale: this });
  }
}

export function createSaleStore(data: SaleTypes.Data): SaleStore {
  return new SaleStore({ data });
}
