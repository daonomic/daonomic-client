// @flow
import axios from 'axios';
import { path } from 'ramda';
import { config } from '~/domains/app/config';
import { baseApiUrl } from '~/domains/app/config/api';
import { authToken } from '~/domains/business/auth/store/token';

import { type IApiClient } from '~/domains/app/api-client/types';

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

export const apiClient: IApiClient = {
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
