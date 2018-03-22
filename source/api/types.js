// @flow
import type {
  AuthToken,
  UserId,
  AuthParams,
  PasswordRecoveryParams,
} from '~/types/auth';
import type {
  BaseKycFormField,
  GetKycAddressAndStatusResponse,
  GetKycUserDataResponse,
  SetKycAddressParams,
  SetKycDataParams,
  SetKycDataResponse,
  KycValidationErrorResponse,
} from '~/types/kyc';
import type { PaymentMethod } from '~/types/payment';

export type ResponsePromise<Data> = Promise<{|
  data: Data,
|}>;

export type PaymentParams = {|
  saleId: string,
  tokenId: string,
|};

export type GetIcoInfoResponse = {|
  paymentMethods: PaymentMethod[],
  kyc: BaseKycFormField[],
  kycUrl: string,
  current: number,
  total: number,
  startDate: number,
  endDate: number,
|};

export interface IApi {
  auth: {|
    login: (
      params: AuthParams,
    ) => ResponsePromise<{ token: AuthToken, id: UserId }>,
    register: (params: AuthParams) => ResponsePromise<{}>,
    resetPassword: ({
      email: string,
      passwordRestorationPagePath: string,
    }) => ResponsePromise<{}>,
    createNewPassword: (params: PasswordRecoveryParams) => ResponsePromise<{}>,
  |};

  kycData: {|
    getAddressAndStatus: () => ResponsePromise<GetKycAddressAndStatusResponse>,
    setAddress: (
      params: SetKycAddressParams,
    ) => ResponsePromise<GetKycAddressAndStatusResponse>,
    getUserData: (params: {
      baseUrl: string,
      userId: UserId,
    }) => ResponsePromise<GetKycUserDataResponse>,
    setUserData: (params: {
      baseUrl: string,
      userId: UserId,
      data: SetKycDataParams,
    }) =>
      | ResponsePromise<SetKycDataResponse>
      | Promise<KycValidationErrorResponse>,
  |};

  getIcoInfo: () => ResponsePromise<GetIcoInfoResponse>;
  getPaymentAddress: (
    params: PaymentParams,
  ) => ResponsePromise<{
    address: string,
  }>;
  getPaymentStatus: (params: PaymentParams) => ResponsePromise<{}[]>;
  getBalance: () => ResponsePromise<{| balance: number |}>;
}
