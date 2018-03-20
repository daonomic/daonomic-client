// @flow
import type { BaseKycFormField } from '~/types/kyc';

export type ResponsePromise<Data> = Promise<{|
  data: Data,
|}>;

export type PaymentParams = {|
  saleId: string,
  tokenId: string,
|};

export type GetIcoInfoResponse = {|
  kyc: BaseKycFormField[],
  kycUrl: string,
  current: number,
  total: number,
  startDate: number,
  endDate: number,
|};

export type ApiShape = {|
  auth: {|
    login: Function,
    register: Function,
    resetPassword: ({
      email: string,
      passwordRestorationPagePath: string,
    }) => ResponsePromise<{}>,
    createNewPassword: Function,
  |},

  kycData: {|
    getAddressAndStatus: Function,
    setAddress: Function,
    getUserData: Function,
    setUserData: Function,
  |},

  getIcoInfo: () => ResponsePromise<GetIcoInfoResponse>,
  getPaymentAddress: (params: PaymentParams) => ResponsePromise<{}>,
  getPaymentStatus: (params: PaymentParams) => ResponsePromise<{}>,
  getBalance: () => ResponsePromise<{}>,
|};
