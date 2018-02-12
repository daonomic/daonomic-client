import axios from 'axios';
import { sale, realm } from '~/config/common';
import auth from '~/stores/auth';

const defaultOptions = {
  get headers() { // auth token can be changed, so we need to recalculate headers before every request
    return {
      'X-REALM': realm,
      'X-AUTH-TOKEN': auth.token,
    };
  },
};
const apiSubDomain = process.env.API === 'development' ? 'dev-api' : 'api';
const daonomicApi = axios.create({
  baseURL: `https://${apiSubDomain}.daonomic.io/v1`,
});

export default {
  auth: {
    login: ({ email, password }) => daonomicApi.post(
      '/login',
      { username: email, password },
      defaultOptions,
    ),
    register: ({ email }) => daonomicApi.post(
      '/register',
      { email },
      defaultOptions,
    ),
    resetPassword: ({ email }) => daonomicApi.post(
      '/password/change',
      { email },
      defaultOptions,
    ),
    createNewPassword: ({ token, password, confirmedPassword }) => daonomicApi.post(
      `/password/change/${token}`,
      {
        password,
        password2: confirmedPassword,
      },
      defaultOptions,
    ),
  },
  address: {
    get: () => daonomicApi.get('/address', defaultOptions),
    set: ({ address }) => daonomicApi.post(
      '/address',
      { address },
      defaultOptions,
    ),
  },
  getIcoInfo: () => daonomicApi.get(`/sales/${sale}`, defaultOptions),
  getPaymentAddress: ({ saleId, tokenId }) => daonomicApi.get(`/sales/${saleId}/payment/${tokenId}/address`, defaultOptions),
  getPaymentStatus: ({ saleId, tokenId }) => daonomicApi.get(`/sales/${saleId}/payment/${tokenId}/status`, defaultOptions),
  getBalance: () => daonomicApi.get(`/sales/${sale}/balance`, defaultOptions),
};
