// @flow
import { path } from 'ramda';
import { type IApiClient } from '~/domains/app/api-client/types';

type Schema = {
  [key: string]: {
    [key: string]: () => any,
  },
};

export function createFakeApiClient(schema: Schema): IApiClient {
  return {
    get: (url) => {
      const getResponse = path([url, 'GET'], schema);

      if (!getResponse) {
        throw new Error(`No fake response provided for GET ${url}`);
      }

      return Promise.resolve({ data: getResponse(), headers: {} });
    },
    post: (url) => {
      const getResponse = path([url, 'POST'], schema);

      if (!getResponse) {
        throw new Error(`No fake response provided for POST ${url}`);
      }

      return Promise.resolve({ data: getResponse(), headers: {} });
    },
  };
}
