import { testKycServerUrl } from '../../../config';

Cypress.Commands.add('getInternalKycParams', ({ fields }) => {
  return {
    type: 'WHITELIST',
    whitelist: {
      provider: `0x${'0'.repeat(40)}`,
      form: {
        serverUrl: testKycServerUrl,
        fields,
      },
    },
  };
});
