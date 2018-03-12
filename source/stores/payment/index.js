import {
  observable,
  computed,
  action,
  reaction,
  autorun,
  runInAction,
} from 'mobx';
import api from '~/api';
import dataStates from '~/utils/data-states';
import generateQRCode from '~/utils/generate-qrcode';
import { sale } from '~/config';
import auth from '~/stores/auth';
import kyc from '~/stores/kyc';

export class PaymentStore {
  @observable dataState = dataStates.initial;

  @computed
  get isFailed() {
    return this.dataState === dataStates.failed;
  }

  @computed
  get isLoading() {
    return this.dataState === dataStates.loading;
  }

  @computed
  get isLoaded() {
    return this.dataState === dataStates.loaded;
  }

  @observable methods = [];

  @computed
  get prices() {
    return this.methods.map(({ id, rate }) => ({
      rate,
      label: id,
    }));
  }

  @observable selectedMethodId = null;
  @observable addressesByMethodId = new Map();
  @observable paymentsByMethodId = new Map();
  @observable selectedMethodAddressQRCode = null;

  @computed
  get selectedMethod() {
    return (
      this.methods.find((method) => method.id === this.selectedMethodId) || {}
    );
  }

  @computed
  get selectedMethodAddress() {
    return this.addressesByMethodId.get(this.selectedMethodId);
  }

  @computed
  get selectedMethodPayments() {
    return this.paymentsByMethodId.get(this.selectedMethodId) || [];
  }

  constructor(options) {
    this.auth = options.auth;
    this.api = options.api;
    this.kyc = options.kyc;
    this.sale = options.sale;

    autorun(() => {
      if (this.auth.isAuthenticated) {
        this.loadInfo();
      }
    });

    // Clear loaded payment addresses on kyc change
    reaction(
      () => !this.kyc.isAllowed,
      (shouldRun) => {
        if (shouldRun) {
          this.addressesByMethodId.clear();
          this.paymentsByMethodId.clear();
        }
      },
    );

    // Load and set payment method address on selected method change or kyc change
    reaction(
      () => this.isLoaded && this.kyc.isAllowed && this.selectedMethodId,
      () => {
        const { id, token } = this.selectedMethod;

        if (
          !this.isLoaded ||
          !this.kyc.isAllowed ||
          this.addressesByMethodId.get(id)
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
              this.addressesByMethodId.set(id, data.address);
            });
          });
      },
    );

    let issueRequestStatusIntervalId = null;

    reaction(
      () => this.selectedMethodAddress && this.auth.isAuthenticated,
      (shouldRun) => {
        clearInterval(issueRequestStatusIntervalId);
        const { selectedMethod } = this;

        if (!shouldRun) {
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

              if (selectedMethod.token === actualSelectedMethod.token) {
                runInAction(() => {
                  this.paymentsByMethodId.set(actualSelectedMethod.id, data);
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
              this.selectedMethodAddressQRCode = generatedQrCode;
            });
          });
        }
      },
    );
  }

  @action
  loadInfo = () => {
    this.dataState = dataStates.loading;

    this.api
      .getIcoInfo()
      .then(({ data }) => data)
      .then(({ paymentMethods }) => {
        runInAction(() => {
          this.dataState = dataStates.loaded;
          this.methods = paymentMethods;
          this.selectedMethodId = ((paymentMethods || [])[0] || {}).id;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.dataState = dataStates.failed;
        });
      });
  };

  @action
  setMethod = (methodId) => {
    this.selectedMethodId = methodId;
  };
}

export default new PaymentStore({
  auth,
  sale,
  kyc,
  api,
});
