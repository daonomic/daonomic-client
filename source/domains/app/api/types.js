// @flow
import type { AuthToken, UserId, PasswordRecoveryParams } from '~/types/auth';
import type { Payment } from '~/types/payment';
import * as UserDataTypes from '~/modules/user-data/types';
import * as KycTypes from '~/modules/kyc/types';
import * as ReferralProgramTypes from '~/domains/business/referral-program/types';
import * as PaymentMethodTypes from '~/domains/business/payment-method/types';

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
    register({|
      email: string,
      referralData: ?ReferralProgramTypes.ReferrerData,
    |}): Response<{}>,
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
    set(UserDataTypes.UserData): Response<mixed>,
  |};

  getSaleInfo(): Response<{|
    address: string,
    paymentMethods: PaymentMethodTypes.Data[],
    current: number,
    total: number,
    startDate: number,
    endDate: number,
    token: {
      symbol: string,
    },
    features: string[],
  |}>;
  getPaymentAddress(
    params: PaymentParams,
  ): Response<{
    address: string,
  }>;
  getPaymentStatus(PaymentParams): Response<Payment[]>;
  getBalance(): Response<{| balance: number |}>;
}
