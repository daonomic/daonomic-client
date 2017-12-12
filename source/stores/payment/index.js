import { observable, computed, action, reaction, autorun, runInAction } from 'mobx';
import api from '~/api/api';
import dataStates from '~/utils/data-states';
import generateQRCode from '~/utils/generate-qrcode';
import { sale } from '~/config/common';
import auth from '~/stores/auth';
import walletAddress from '~/stores/wallet/address';

export class PaymentStore {
  @observable dataState = dataStates.initial;

  @computed get isFailed() {
    return this.dataState === dataStates.failed;
  }

  @computed get isLoading() {
    return this.dataState === dataStates.loading;
  }

  @computed get isLoaded() {
    return this.dataState === dataStates.loaded;
  }

  @observable methods = [];

  @computed get prices() {
    return this.methods.map(({ id, rate }) => ({
      rate,
      label: id,
    }));
  }

  @observable selectedMethodId = null;
  @observable addressesByMethodId = new Map();
  @observable paymentsByMethodId = new Map();
  @observable issueRequestsIdsByMethodId = new Map();
  @observable selectedMethodAddressQRCode = null;

  @computed get selectedMethod() {
    return this.methods.find((method) => method.id === this.selectedMethodId) || {};
  }

  @computed get selectedMethodAddress() {
    return this.addressesByMethodId.get(this.selectedMethodId);
  }

  @computed get selectedMethodPayments() {
    return this.paymentsByMethodId.get(this.selectedMethodId) || [];
  }

  @computed get selectedMethodIssueRequestId() {
    return this.issueRequestsIdsByMethodId.get(this.selectedMethodId);
  }

  constructor(options) {
    this.auth = options.auth;
    this.api = options.api;
    this.walletAddress = options.walletAddress;
    this.sale = options.sale;

    autorun(() => {
      if (this.auth.isAuthenticated) {
        this.loadInfo();
      }
    });

    // Clear loaded payment addresses on wallet change
    reaction(
      () => !this.walletAddress.isSaved,
      (shouldRun) => {
        if (shouldRun) {
          this.addressesByMethodId.clear();
          this.paymentsByMethodId.clear();
          this.issueRequestsIdsByMethodId.clear();
        }
      },
    );

    // Load and set payment method address on selected method change or wallet change
    reaction(
      () => this.isLoaded && this.walletAddress.isSaved && this.selectedMethodId,
      () => {
        const { id, daox, token } = this.selectedMethod;

        if (!this.isLoaded || !this.walletAddress.isSaved || this.addressesByMethodId.get(id)) {
          return;
        }

        if (daox) {
          this.api
            .issueToken({
              token,
              to: this.sale,
              data: this.walletAddress.address,
            })
            .then(({ data }) => {
              runInAction(() => {
                this.issueRequestsIdsByMethodId.set(id, data.id);
                this.addressesByMethodId.set(id, data.externalAddress);
              });
            });
        } else {
          runInAction(() => this.addressesByMethodId.set(id, this.sale));
        }
      },
    );

    let issueRequestStatusIntervalId = null;

    reaction(
      () => this.selectedMethodIssueRequestId && this.auth.isAuthenticated,
      (shouldRun) => {
        clearInterval(issueRequestStatusIntervalId);
        const { selectedMethodIssueRequestId } = this;

        if (!shouldRun) {
          return;
        }

        const updateIssueRequestStatus = () => this.api.getIssueRequestStatus({ id: selectedMethodIssueRequestId }).then(({ data }) => {
          const actualSelectedMethodIssueRequestId = this.selectedMethodIssueRequestId;

          if (selectedMethodIssueRequestId === actualSelectedMethodIssueRequestId) {
            runInAction(() => {
              this.paymentsByMethodId.set(this.selectedMethodId, data);
            });
          }
        });

        issueRequestStatusIntervalId = setInterval(updateIssueRequestStatus, 3000);
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

  @action loadInfo = () => {
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

  @action setMethod = (methodId) => {
    this.selectedMethodId = methodId;
  };
}

export default new PaymentStore({
  auth,
  sale,
  walletAddress,
  api,
});
