const { createIco } = require('../../server-api');

const defaultKycParams = {
  type: 'NONE',
};

Cypress.Commands.add('getTemporaryIco', ({ kyc = defaultKycParams } = {}) => {
  return createIco({
    kyc,
  });
});
