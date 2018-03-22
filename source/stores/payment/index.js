// @flow
import {
  observable,
  computed,
  action,
  reaction,
  autorun,
  runInAction,
} from 'mobx';
import { createViewModel } from 'mobx-utils';
import generateQRCode from '~/utils/generate-qrcode';
import type { IApi } from '~/api/types';
import type { IAuth } from '~/stores/auth/types';
import type { KycStore } from '~/stores/kyc';
import type { PaymentMethod } from '~/types/payment';
import type { IPaymentStoreState } from './types';

class PaymentStoreState implements IPaymentStoreState {
  @observable dataState = 'initial';
  @observable methods = [];
  @observable selectedMethodId = null;
  @observable addressesByMethodId: Map<string, string> = new Map();
  @observable paymentsByMethodId: Map<string, {}[]> = new Map();
  @observable selectedMethodAddressQRCode = '';
}

export class PaymentStore {
  api: IApi;
  auth: IAuth;
  kyc: KycStore;
  sale: string;

  @observable state = createViewModel(new PaymentStoreState());

  @computed
  get isFailed(): boolean {
    return this.state.dataState === 'failed';
  }

  @computed
  get isLoading(): boolean {
    return this.state.dataState === 'loading';
  }

  @computed
  get isLoaded(): boolean {
    return this.state.dataState === 'loaded';
  }

  @computed
  get prices(): { rate: number, label: string }[] {
    return this.state.methods.map(({ id, rate }) => ({
      rate,
      label: id,
    }));
  }

  @computed
  get selectedMethod(): ?PaymentMethod {
    return this.state.methods.find(
      (method) => method.id === this.state.selectedMethodId,
    );
  }

  @computed
  get selectedMethodAddress(): ?string {
    return this.state.addressesByMethodId.get(
      this.state.selectedMethodId || '',
    );
  }

  @computed
  get selectedMethodPayments(): {}[] {
    return (
      this.state.paymentsByMethodId.get(this.state.selectedMethodId || '') || []
    );
  }

  constructor(options: {
    api: IApi,
    auth: IAuth,
    kyc: KycStore,
    sale: string,
  }) {
    this.auth = options.auth;
    this.api = options.api;
    this.kyc = options.kyc;
    this.sale = options.sale;
    this.initState();

    autorun(() => {
      if (this.auth.isAuthenticated) {
        this.loadInfo();
      }
    });

    // Load and set payment method address on selected method change or kyc change
    reaction(
      () => this.isLoaded && this.kyc.isAllowed && this.state.selectedMethodId,
      () => {
        if (!this.selectedMethod) {
          return;
        }

        const { id, token } = this.selectedMethod;

        if (
          !this.isLoaded ||
          !this.kyc.isAllowed ||
          this.state.addressesByMethodId.get(id)
        ) {
          return;
        }

        this.api
          .getPaymentAddress({
            saleId: this.sale,
            tokenId: token,
          })
          .then(({ data }) => {
            runInAction(() => {
              this.state.addressesByMethodId.set(id, data.address);
            });
          });
      },
    );

    let issueRequestStatusIntervalId = null;

    autorun(() => {
      if (!this.auth.isAuthenticated || !this.kyc.isAllowed) {
        this.reset();

        if (issueRequestStatusIntervalId) {
          clearInterval(issueRequestStatusIntervalId);
        }
      }
    });

    reaction(
      () => this.selectedMethodAddress,
      (address) => {
        if (issueRequestStatusIntervalId) {
          clearInterval(issueRequestStatusIntervalId);
        }

        const { selectedMethod } = this;

        if (!address || !selectedMethod) {
          return;
        }

        const updateIssueRequestStatus = () =>
          this.api
            .getPaymentStatus({
              saleId: this.sale,
              tokenId: selectedMethod.token,
            })
            .then(({ data }) => {
              const actualSelectedMethod = this.selectedMethod;

              if (
                actualSelectedMethod &&
                selectedMethod.token === actualSelectedMethod.token
              ) {
                runInAction(() => {
                  this.state.paymentsByMethodId.set(
                    actualSelectedMethod.id,
                    data,
                  );
                });
              }
            });

        issueRequestStatusIntervalId = setInterval(
          updateIssueRequestStatus,
          3000,
        );
        updateIssueRequestStatus();
      },
    );

    reaction(
      () => this.selectedMethodAddress,
      (address) => {
        if (address) {
          generateQRCode(address).then((generatedQrCode) => {
            runInAction(() => {
              this.state.selectedMethodAddressQRCode = generatedQrCode;
            });
          });
        }
      },
    );
  }

  initState = () => {
    this.state.reset();
    this.state.addressesByMethodId = new Map();
    this.state.paymentsByMethodId = new Map();
  };

  @action
  loadInfo = () => {
    this.state.dataState = 'loading';

    this.api
      .getIcoInfo()
      .then(({ data }) => data)
      .then(({ paymentMethods }) => {
        runInAction(() => {
          this.state.dataState = 'loaded';
          this.state.methods = paymentMethods;
          this.state.selectedMethodId = ((paymentMethods || [])[0] || {}).id;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.state.dataState = 'failed';
        });
      });
  };

  @action
  setMethod = (methodId: string) => {
    this.state.selectedMethodId = methodId;
  };

  @action
  reset = () => {
    this.initState();
  };
}

export function paymentProvider(
  api: IApi,
  auth: IAuth,
  saleId: string,
  kyc: KycStore,
) {
  return new PaymentStore({
    auth,
    sale: saleId,
    kyc,
    api,
  });
}
