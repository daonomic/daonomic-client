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
import type { PaymentMethod } from '~/types/payment';

export type Response<Data> = Promise<{|
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
  token: {
    symbol: string,
  },
|};

export interface IApi {
  auth: {|
    login({| email: string, password: string |}): Response<{
      token: AuthToken,
      id: UserId,
    }>,
    register({| email: string |}): Response<{}>,
    resetPassword({
      email: string,
      passwordRestorationPagePath: string,
    }): Response<{}>,
    createNewPassword(PasswordRecoveryParams): Response<{}>,
  |};

  kycData: {|
    getAddressAndStatus: () => Response<GetKycAddressAndStatusResponse>,
    setAddress: (
      params: SetKycAddressParams,
    ) => Response<GetKycAddressAndStatusResponse>,
    getUserData: (params: {
      baseUrl: string,
      userId: UserId,
    }) => Response<GetKycUserDataResponse>,
    setUserData: (params: {
      baseUrl: string,
      userId: UserId,
      data: SetKycDataParams,
    }) => Response<SetKycDataResponse> | Promise<KycValidationErrorResponse>,
  |};

  getIcoInfo: () => Response<GetIcoInfoResponse>;
  getPaymentAddress: (
    params: PaymentParams,
  ) => Response<{
    address: string,
  }>;
  getPaymentStatus: (params: PaymentParams) => Response<{}[]>;
  getBalance: () => Response<{| balance: number |}>;
}
