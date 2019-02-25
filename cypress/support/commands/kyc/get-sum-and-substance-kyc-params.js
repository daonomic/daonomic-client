Cypress.Commands.add('getSumAndSubstanceKycParams', () => {
  return {
    type: 'WHITELIST',
    whitelist: {
      provider: 'SUMSUB',
      sumsub: {
        clientId: 'Daonomic',
        key: 'kKxUOUmb4WdAeZ6n2ASOaGlh0DmUgixl1Dy/RNsp1FsVBgQpbMA/3Q==',
        registration: 'OPTIONAL',
        userData: true,
      },
    },
  };
});
