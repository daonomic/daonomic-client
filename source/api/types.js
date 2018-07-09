// @flow
import type { AuthToken, UserId, PasswordRecoveryParams } from '~/types/auth';
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

  kyc: {|
    getStatus(): Response<KycTypes.State>,
    getInternalKycData({| baseUrl: string, userId: UserId |}): Response<{}>,
    setInternalKycData({|
      url: string,
      data: {},
    |}): Response<{}>,
    sendToReview(): Response<{}>,
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
