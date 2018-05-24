// @flow
import type { AuthToken, UserId, PasswordRecoveryParams } from '~/types/auth';
import type {
  BaseKycFormField,
  GetKycAddressAndStatusResponse,
  GetKycUserDataResponse,
  SetKycAddressParams,
  SetKycDataParams,
  SetKycDataResponse,
  KycValidationErrorResponse,
} from '~/types/kyc';
import type { PaymentMethod, Payment } from '~/types/payment';

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

  getIcoInfo(): Response<{|
    paymentMethods: PaymentMethod[],
    kyc: BaseKycFormField[],
    kycUrl: string,
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
