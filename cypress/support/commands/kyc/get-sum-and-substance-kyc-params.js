Cypress.Commands.add('getSumAndSubstanceKycParams', () => {
  return {
    type: 'WHITELIST',
    whitelist: {
      provider: 'SUMSUB',
      sumsub: {
        clientId: 'Daonomic',
        key: 'MASKDVRKNKNERN',
        registration: 'OPTIONAL',
        userData: true,
      },
    },
  };
});
