function createMockRoute(responses) {
  let currentResponse = responses.success;

  function route(...params) {
    return currentResponse(...params);
  }

  route.setResponse = (responseName) => {
    currentResponse = responses[responseName];
  };

  route.reset = () => {
    currentResponse = responses.success;
  };

  return route;
}

function createResponse(data) {
  return Promise.resolve({ data });
}

function createFailResponse(status = 400, data = {}) {
  const error = new Error('Request failed');

  error.response = {
    status,
    data,
  };

  return Promise.reject(error);
}

export default {
  address: {
    get: createMockRoute({
      success: () => createResponse({
        address: '12345',
      }),
      fail: createFailResponse,
      failNotAuthorized: () => createFailResponse(403),
    }),
    set: createMockRoute({
      success: () => createResponse({}),
      fail: () => createFailResponse(400, {
        fieldErrors: {
          address: ['Should be a hex address with 20 bytes length'],
        },
      }),
    }),
  },
  auth: {
    login: createMockRoute({
      success: createResponse,
      fail: () => (
        createFailResponse(400, {
          fieldErrors: {
            username: ['This email does not exist'],
          },
        })
      ),
    }),
    register: createMockRoute({
      success: createResponse,
      fail: () => (
        createFailResponse(400, {
          fieldErrors: {
            email: ['This email is already occupied'],
          },
        })
      ),
    }),
    resetPassword: createMockRoute({
      success: createResponse,
      fail: createFailResponse,
    }),
    createNewPassword: createMockRoute({
      success: createResponse,
      fail: () => (
        createFailResponse(400, {
          fieldErrors: {
            password2: ['The passwords must match'],
          },
        })
      ),
    }),
  },
  getBalance: createMockRoute({
    success: () => createResponse({
      balance: 5,
    }),
    fail: createFailResponse,
  }),
  getIcoInfo: createMockRoute({
    success: () => createResponse({
      id: '0x99a09f0d85bc6e95e110348a8522f98443e31c4a',
      total: 20,
      sold: 10,
      paymentMethods: [
        {
          id: 'ETH',
          token: '0x0000000000000000000000000000000000000000',
          label: 'Ethereum',
          rateRaw: 2666666666,
          decimals: 18,
          daox: false,
          price: 0.0375,
          rate: 26.66667,
        },
        {
          id: 'BTC',
          token: '0x5cbef5849c3b4d86f6830784fd3f879a2d2e61c7',
          label: 'Bitcoin',
          rateRaw: 593333333333333400000,
          decimals: 8,
          daox: true,
          price: 0.0016854,
          rate: 593.3333,
        },
      ],
    }),
    successBtcFirst: () => createResponse({
      id: '0x99a09f0d85bc6e95e110348a8522f98443e31c4a',
      total: 20,
      sold: 10,
      paymentMethods: [
        {
          id: 'BTC',
          token: '0x5cbef5849c3b4d86f6830784fd3f879a2d2e61c7',
          label: 'Bitcoin',
          rateRaw: 593333333333333400000,
          decimals: 8,
          daox: true,
          price: 0.0016854,
          rate: 593.3333,
        },
        {
          id: 'ETH',
          token: '0x0000000000000000000000000000000000000000',
          label: 'Ethereum',
          rateRaw: 2666666666,
          decimals: 18,
          daox: false,
          price: 0.0375,
          rate: 26.66667,
        },
      ],
    }),
    fail: createFailResponse,
  }),
  issueToken: createMockRoute({
    success: () => createResponse({
      id: '5a0aaafdc2d5b738a8f702c8',
      token: {
        id: 'BTC',
        label: 'Bitcoin',
        address: '0x5cbef5849c3b4d86f6830784fd3f879a2d2e61c7',
        decimals: 8,
      },
      externalAddress: 'msWLqbLYmWr21neydLNWwLccTPjDTmmXbM',
    }),
    fail: createFailResponse,
  }),
  getIssueRequestStatus: createMockRoute({
    success: (() => {
      let lastPaymentId = 0;
      const createPayment = () => ({
        id: lastPaymentId++,
        value: 0.1,
        blocks: 1,
        finished: true,
        externalTxId: '0x67d593344f68d04d2dd6189b7e53de122bff648ad2c575a24526536562d6def1',
        txHash: '0x5d0ce34f2d5e6a716775876243552fb6df7528bbc4190b46ef8f74d729accea2',
      });
      let paymentsCount = 1;

      return () => createResponse(Array.from({ length: paymentsCount++ }).map(createPayment));
    })(),
    fail: createFailResponse,
  }),
};
