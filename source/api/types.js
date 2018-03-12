// @flow
import type { BaseKycFormField } from '~/types/kyc';

export type ResponsePromise<Data> = Promise<{|
  data: Data,
|}>;

export type ApiShape = {|
  auth: {|
    login: Function,
    register: Function,
    resetPassword: Function,
    createNewPassword: Function,
  |},

  kycData: {|
    getAddressAndStatus: Function,
    setAddress: Function,
    getUserData: Function,
    setUserData: Function,
  |},

  getIcoInfo: Function,
  getPaymentAddress: Function,
  getPaymentStatus: Function,
  getBalance: Function,
|};

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
