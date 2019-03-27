import { baseTestApiUrl } from '../../../config';

Cypress.Commands.add('createExternalKycProvider', ({ jurisdiction }) => {
  return cy
    .request('POST', `${baseTestApiUrl}/providers`, {
      name: 'Test KYC provider',
      url: `${baseTestApiUrl}/providers/external`,
      jurisdiction,
    })
    .then(({ body }) => body);
});
