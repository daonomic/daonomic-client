// @flow
import type { AuthToken, UserId, PasswordRecoveryParams } from '~/types/auth';
import type {
  GetKycAddressAndStatusResponse,
  GetKycUserDataResponse,
  SetKycAddressParams,
  SetKycDataParams,
  SetKycDataResponse,
  KycValidationErrorResponse,
} from '~/types/kyc';
import type { PaymentMethod, Payment } from '~/types/payment';
import * as UserDataTypes from '~/modules/user-data/types';
import * as KycTypes from '~/modules/kyc/types';

export type Response<Data> = Promise<{|
  data: Data,
|}>;

export type PaymentParams = {|
  saleId: string,
  tokenId: string,
|};

type LoginResponse = {|
  token: AuthToken,
  id: UserId,
|};

export interface IApi {
  auth: {|
    login({| email: string, password: string |}): Response<LoginResponse>,
    register({| email: string |}): Response<{}>,
    resetPassword({|
      email: string,
      passwordRestorationPagePath: string,
    |}): Response<{}>,
    createNewPassword(PasswordRecoveryParams): Response<{}>,
  |};

  kycData: {|
    getAddressAndStatus(): Response<GetKycAddressAndStatusResponse>,
    setAddress(SetKycAddressParams): Response<GetKycAddressAndStatusResponse>,
    sendToReview(): Response<{}>,
    getUserData({
      baseUrl: string,
      userId: UserId,
    }): Response<GetKycUserDataResponse>,
    setUserData({
      baseUrl: string,
      userId: UserId,
      data: SetKycDataParams,
    }): Response<SetKycDataResponse> | Promise<KycValidationErrorResponse>,
  |};

  kyc: {|
    getStatus(): Response<KycTypes.State>,
  |};

  userData: {|
    get(): Response<{|
      address?: UserDataTypes.Address,
      country?: UserDataTypes.Country,
    |}>,
    set({
      address: UserDataTypes.Address,
      country: UserDataTypes.Country,
    }): Response<mixed>,
  |};

  getSaleInfo(): Response<{|
    address: string,
    paymentMethods: PaymentMethod[],
    current: number,
    total: number,
    startDate: number,
    endDate: number,
    token: {
      symbol: string,
    },
  |}>;
  getPaymentAddress(
    params: PaymentParams,
  ): Response<{
    address: string,
  }>;
  getPaymentStatus(PaymentParams): Response<Payment[]>;
  getBalance(): Response<{| balance: number |}>;
}
