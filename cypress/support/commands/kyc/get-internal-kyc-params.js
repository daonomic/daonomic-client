import { baseKycServerUrl } from '../../../config';

Cypress.Commands.add('getInternalKycParams', ({ fields }) => {
  return {
    type: 'WHITELIST',
    whitelist: {
      provider: 'SELF_SERVICE',
      selfService: {
        serverUrl: baseKycServerUrl,
        fields,
      },
    },
  };
});
