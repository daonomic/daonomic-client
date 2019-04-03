import { testKycServerUrl } from '../../../config';

Cypress.Commands.add('getInternalKycParams', ({ fields }) => {
  return {
    provider: 'SELF_SERVICE',
    selfService: {
      serverUrl: testKycServerUrl,
      fields,
    },
  };
});
