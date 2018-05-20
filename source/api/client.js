// @flow
import axios from 'axios';
import { path } from 'ramda';
import config from '~/config';
import { baseApiUrl } from '~/config/api';
import { authTokenProvider } from '~/stores/auth/token';

const authToken = authTokenProvider();
const axiosClient = axios.create({ baseURL: baseApiUrl });

function getDefaultRequestOptions() {
  return {
    headers: {
      'X-REALM': config.realmId,
      'X-AUTH-TOKEN': authToken.value,
    },
  };
}

function handleFailedResponse(error) {
  if (path(['response', 'status'], error) === 403) {
    authToken.reset();
    return;
  }

  console.error(error); // eslint-disable-line no-console
  throw error;
}

export default {
  get: (path: string, options?: {} = {}) => {
    return axiosClient
      .get(path, {
        ...getDefaultRequestOptions(),
        ...options,
      })
      .catch(handleFailedResponse);
  },

  post: (path: string, body: mixed, options?: {} = {}) => {
    return axiosClient
      .post(path, body, {
        ...getDefaultRequestOptions(),
        ...options,
      })
      .catch(handleFailedResponse);
  },
};
