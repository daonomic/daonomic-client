let currentIco = null;

Cypress.Commands.add('getCurrentIco', () => {
  if (currentIco) return cy.wrap(currentIco);

  const internalFields = [
    {
      name: 'firstName',
      label: 'First name',
      type: 'STRING',
      required: true,
    },
    {
      name: 'lastName',
      label: 'Last name',
      type: 'STRING',
      required: true,
    },
    {
      name: 'terms',
      label: 'Agree with the terms and conditions',
      type: 'BOOLEAN',
      required: true,
    },
  ];

  return cy
    .createIco((data) => ({
      ...data,
      kyc: {
        provider: 'SELF_SERVICE',
      },
    }))
    .then((ico) =>
      cy
        .getInternalKycParams({
          fields: internalFields,
        })
        .then((params) =>
          cy
            .updateTokenKyc(ico.realmId, ico.adminData.token, params)
            .then(() => {
              currentIco = ico;
              return cy.wrap(ico);
            }),
        ),
    );
});
