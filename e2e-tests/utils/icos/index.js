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
    type: 'KYC',
    kyc: {
      provider: `0x${'0'.repeat(40)}`,
      form: {
        serverUrl: 'http://ops:9095/v1',
        fields,
      },
    },
  };
}

module.exports = {
  getCurrentIco,
  getTemporaryIco,
  getInternalKycParams,
};
