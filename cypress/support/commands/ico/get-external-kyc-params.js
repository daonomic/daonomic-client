Cypress.Commands.add('getExternalKycParams', ({ providerAddress }) => {
  return {
    type: 'SECURITY',
    security: {
      otherProvider: providerAddress,
      usProvider: providerAddress,
    },
  };
});
