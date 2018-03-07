// @flow
import axios from 'axios';
import { sale, realm } from '~/config';
import auth from '~/stores/auth';
import cacheResult from '~/utils/cache-result';
import type {
  GetKycAddressAndStatusResponse,
  SetKycAddressParams,
  GetKycUserDataResponse,
  SetKycDataParams,
  SetKycDataResponse,
  KycValidationErrorResponse,
} from '~/types/kyc';
import type { AuthParams, PasswordRecoveryParams } from '~/types/auth';
import type { PaymentParams, GetIcoInfoResponse } from './types';

const defaultOptions = {
  get headers() {
    // auth token can be changed, so we need to recalculate headers before every request
    return {
      'X-REALM': realm,
      'X-AUTH-TOKEN': auth.token,
    };
  },
};
const apiSubDomain = process.env.API === 'development' ? 'dev-api' : 'api';
const baseApiUrl = `https://${apiSubDomain}.daonomic.io/v1`;

const daonomicApi = axios.create({
  baseURL: baseApiUrl,
});

export default {
  auth: {
    login: ({ email, password }: AuthParams) =>
      daonomicApi.post('/login', { username: email, password }, defaultOptions),
    register: ({ email }: AuthParams) =>
      daonomicApi.post('/register', { email }, defaultOptions),
    resetPassword: ({ email }: AuthParams) =>
      daonomicApi.post('/password/change', { email }, defaultOptions),
    createNewPassword: ({
      token,
      password,
      confirmationPassword,
    }: PasswordRecoveryParams) =>
      daonomicApi.post(
        `/password/change/${token}`,
        {
          password,
          password2: confirmationPassword,
        },
        defaultOptions,
      ),
  },

  kycData: {
    getAddressAndStatus: (): Promise<{
      data: GetKycAddressAndStatusResponse,
    }> => daonomicApi.get(`/sales/${sale}/address`, defaultOptions),
    setAddress: ({
      address,
    }: SetKycAddressParams): Promise<{
      data: GetKycAddressAndStatusResponse,
    }> =>
      daonomicApi.post(`/sales/${sale}/address`, { address }, defaultOptions),
    getUserData: ({
      baseUrl,
    }: {
      baseUrl: string,
    }): Promise<{ data: GetKycUserDataResponse }> =>
      axios.get(`${baseUrl}/users/${auth.id}`).catch(() => ({ data: {} })),
    setUserData: ({
      baseUrl,
      data,
    }: {
      baseUrl: string,
      data: SetKycDataParams,
    }): Promise<SetKycDataResponse | KycValidationErrorResponse> =>
      axios.post(`${baseUrl}/users/${auth.id}`, data),
  },

  getIcoInfo: cacheResult(
    (): Promise<{ data: GetIcoInfoResponse }> =>
      daonomicApi.get(`/sales/${sale}`, defaultOptions),
    5000,
  ),
  getPaymentAddress: ({ saleId, tokenId }: PaymentParams) =>
    daonomicApi.get(
      `/sales/${saleId}/payment/${tokenId}/address`,
      defaultOptions,
    ),
  getPaymentStatus: ({ saleId, tokenId }: PaymentParams) =>
    daonomicApi.get(
      `/sales/${saleId}/payment/${tokenId}/status`,
      defaultOptions,
    ),
  getBalance: () => daonomicApi.get(`/sales/${sale}/balance`, defaultOptions),
};
