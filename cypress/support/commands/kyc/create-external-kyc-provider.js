import { testKycProviderUrl } from '../../../config';

Cypress.Commands.add('createExternalKycProvider', ({ jurisdiction }) => {
  return cy
    .request('POST', 'http://ops:9090/providers', {
      name: 'Test KYC provider',
      url: testKycProviderUrl,
      jurisdiction,
    })
    .then(({ body }) => body);
});
