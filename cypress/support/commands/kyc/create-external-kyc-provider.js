import { config } from '../../../config';

Cypress.Commands.add('createExternalKycProvider', ({ jurisdiction }) => {
  return cy
    .request('POST', 'http://ops:9090/providers', {
      name: 'Test KYC provider',
      url: config.testKycProviderUrl,
      jurisdiction,
    })
    .then(({ body }) => body);
});
