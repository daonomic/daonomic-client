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
import type { ApiShape, ResponsePromise } from './types';

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

const api: ApiShape = {
  auth: {
    login: ({ email, password }: AuthParams) =>
      daonomicApi.post('/login', { username: email, password }, defaultOptions),
    register: ({ email }: AuthParams) =>
      daonomicApi.post('/register', { email }, defaultOptions),
    resetPassword: ({ email, passwordRestorationPagePath }) =>
      daonomicApi.post(
        '/password/change',
        { email, changePasswordPath: passwordRestorationPagePath },
        defaultOptions,
      ),
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
    getAddressAndStatus: (): ResponsePromise<GetKycAddressAndStatusResponse> =>
      daonomicApi.get(`/sales/${sale}/address`, defaultOptions),
    setAddress: ({
      address,
    }: SetKycAddressParams): ResponsePromise<GetKycAddressAndStatusResponse> =>
      daonomicApi.post(`/sales/${sale}/address`, { address }, defaultOptions),
    getUserData: ({
      baseUrl,
    }: {
      baseUrl: string,
    }): ResponsePromise<GetKycUserDataResponse> =>
      axios.get(`${baseUrl}/users/${auth.id}`).catch(() => ({ data: {} })),
    setUserData: ({
      baseUrl,
      data,
    }: {
      baseUrl: string,
      data: SetKycDataParams,
    }):
      | ResponsePromise<SetKycDataResponse>
      | Promise<KycValidationErrorResponse> =>
      axios.post(`${baseUrl}/users/${auth.id}`, data),
  },

  getIcoInfo: cacheResult(
    () => daonomicApi.get(`/sales/${sale}`, defaultOptions),
    5000,
  ),
  getPaymentAddress: ({ saleId, tokenId }) =>
    daonomicApi.get(
      `/sales/${saleId}/payment/${tokenId}/address`,
      defaultOptions,
    ),
  getPaymentStatus: ({ saleId, tokenId }) =>
    daonomicApi.get(
      `/sales/${saleId}/payment/${tokenId}/status`,
      defaultOptions,
    ),
  getBalance: () => daonomicApi.get(`/sales/${sale}/balance`, defaultOptions),
};

export default api;
