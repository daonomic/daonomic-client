import { testKycServerUrl } from '../../../config';

Cypress.Commands.add('getInternalKycParams', ({ fields }) => {
  return {
    type: 'WHITELIST',
    whitelist: {
      provider: 'SELF_SERVICE',
      form: {
        serverUrl: testKycServerUrl,
        fields,
      },
    },
  };
});
