const { testKycServerUrl } = require('../../config');
const { createIco } = require('../../server-api');

const defaultKycParams = {
  type: 'NONE',
};
let currentIco = null;

function getCurrentIco() {
  if (currentIco) {
    return currentIco;
  }

  currentIco = createIco({
    kyc: defaultKycParams,
  }).catch((error) => {
    console.error('Failed to create ICO', error); // eslint-disable-line
    currentIco = null;
    throw error;
  });

  return currentIco;
}

function getTemporaryIco({ kyc = defaultKycParams } = {}) {
  return createIco({
    kyc,
  }).catch((error) => {
    console.error('Failed to create ICO', error); // eslint-disable-line
    throw error;
  });
}

function getInternalKycParams({ fields }) {
  return {
    type: 'WHITELIST',
    kyc: {
      provider: `0x${'0'.repeat(40)}`,
      form: {
        serverUrl: testKycServerUrl,
        fields,
      },
    },
  };
}

function getExternalKycParams({ providerAddress }) {
  return {
    type: 'SECURITY',
    security: {
      otherProvider: providerAddress,
      usProvider: providerAddress,
    },
  };
}

module.exports = {
  getCurrentIco,
  getTemporaryIco,
  getInternalKycParams,
  getExternalKycParams,
};
