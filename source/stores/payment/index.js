// @flow
import {
  observable,
  computed,
  action,
  reaction,
  autorun,
  runInAction,
  toJS,
} from 'mobx';
import createViewModel, { type ViewModel } from '~/utils/create-view-model';
import generateQRCode from '~/utils/generate-qrcode';
import type { IApi } from '~/domains/app/api/types';
import type { IAuth } from '~/stores/auth/types';
import type { KycStore } from '~/modules/kyc/store';
import type { Payment } from '~/types/payment';
import type { IPaymentStoreState } from './types';
import * as PaymentMethodTypes from '~/domains/business/payment-method/types';

class PaymentStoreState implements IPaymentStoreState {
  @observable
  dataState = 'initial';
  @observable
  methods = [];
  @observable
  selectedMethodId = null;
  @observable
  addressesByMethodId: Map<string, string> = new Map();
  @observable
  paymentsByMethodId: Map<PaymentMethodTypes.Id, Payment[]> = new Map();
  @observable
  selectedMethodAddressQRCode = '';
}

export class PaymentStore {
  api: IApi;
  auth: IAuth;
  kyc: KycStore;
  sale: string;

  @observable
  state: ViewModel<PaymentStoreState> = createViewModel(
    new PaymentStoreState(),
  );

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
  get publicPrices(): { rate: number, label: string }[] {
    return this.state.methods
      .filter((method) => method.id !== 'ERC20')
      .map(({ id, rate }) => ({
        rate,
        label: id,
      }));
  }

  @computed
  get selectedMethod(): ?PaymentMethodTypes.Data {
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
  get selectedMethodPayments(): Payment[] {
    return toJS(
      this.state.paymentsByMethodId.get(this.state.selectedMethodId || '') ||
        [],
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

    // Load and set payment method address on selected method change or kyc change
    reaction(
      () => this.isLoaded && this.kyc.isAllowed && this.state.selectedMethodId,
      () => {
        this.loadCurrentMethod();
      },
    );

    let issueRequestStatusIntervalId = null;

    autorun(() => {
      if (this.auth.isAuthenticated) {
        this.loadInfo();
      } else {
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

        const updateIssueRequestStatus = async () => {
          const { data } = await this.api.getPaymentStatus({
            saleId: this.sale,
            tokenId: selectedMethod.token,
          });
          const actualSelectedMethod = this.selectedMethod;

          if (
            actualSelectedMethod &&
            selectedMethod.token === actualSelectedMethod.token
          ) {
            runInAction(() => {
              this.state.paymentsByMethodId.set(actualSelectedMethod.id, data);
            });
          }
        };

        issueRequestStatusIntervalId = setInterval(
          updateIssueRequestStatus,
          3000,
        );
        updateIssueRequestStatus();
      },
    );

    reaction(
      () => this.selectedMethodAddress,
      () => {
        this.updateQrCode();
      },
    );
  }

  initState = () => {
    this.state.reset();
    this.state.addressesByMethodId = new Map();
    this.state.paymentsByMethodId = new Map();
  };

  @action
  loadCurrentMethod = async () => {
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

    const { data } = await this.api.getPaymentAddress({
      saleId: this.sale,
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

    const generatedQrCode = await generateQRCode(address);

    runInAction(() => {
      this.state.selectedMethodAddressQRCode = generatedQrCode;
    });
  };

  @action
  loadInfo = async () => {
    this.state.dataState = 'loading';

    try {
      const {
        data: { paymentMethods: originalPaymentMethods = [], payWithErc20 },
      } = await this.api.getSaleInfo();
      const ethPaymentMethod = originalPaymentMethods.find(
        (method) => method.id === 'ETH',
      );
      const additionalPaymentMethods = [];

      if (payWithErc20) {
        additionalPaymentMethods.push({
          ...ethPaymentMethod,
          id: 'ERC20',
          label: 'ERC20',
        });
      }

      const paymentMethods = originalPaymentMethods.concat(
        additionalPaymentMethods,
      );

      runInAction(() => {
        this.state.dataState = 'loaded';
        this.state.methods = paymentMethods;
        this.state.selectedMethodId = (paymentMethods[0] || {}).id;
      });
    } catch (error) {
      runInAction(() => {
        this.state.dataState = 'failed';
      });
    }
  };

  @action
  setMethod = (methodId: PaymentMethodTypes.Id) => {
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
