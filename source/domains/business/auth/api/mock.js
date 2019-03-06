// @flow
import type { IAuthApi } from '~/domains/business/auth/types';

function createMockRoute(responses) {
  let currentResponse = responses.success;

  function route(): Promise<any> {
    return currentResponse();
  }

  route.setResponse = (responseName) => {
    currentResponse = responses[responseName];
  };

  route.reset = () => {
    currentResponse = responses.success;
  };

  return route;
}

function createResponse(data = {}) {
  return Promise.resolve(data);
}

type ResponseError = Error & {
  response?: {
    status: number,
    data: mixed,
  },
};

function createFailResponse(status = 400, data = {}) {
  const error: ResponseError = new Error('Request failed');

  error.response = {
    status,
    data,
  };

  return Promise.reject(error);
}

export const mockAuthApi: IAuthApi = {
  login: createMockRoute({
    success: () =>
      createResponse({
        id: 1,
        token: '12345',
      }),
    fail: () =>
      createFailResponse(400, {
        fieldErrors: {
          email: ['This email does not exist'],
        },
      }),
  }),
  register: createMockRoute({
    success: createResponse,
    fail: () =>
      createFailResponse(400, {
        fieldErrors: {
          email: ['This email is already occupied'],
        },
      }),
  }),
  resetPassword: createMockRoute({
    success: createResponse,
    fail: () =>
      createFailResponse(400, {
        fieldErrors: {
          email: ['This email does not exist'],
        },
      }),
  }),
  createNewPassword: createMockRoute({
    success: createResponse,
    fail: () =>
      createFailResponse(400, {
        fieldErrors: {
          password2: ['The passwords must match'],
        },
      }),
  }),
};
