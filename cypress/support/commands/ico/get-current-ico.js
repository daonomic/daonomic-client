let currentIco = null;

Cypress.Commands.add('getCurrentIco', () => {
  if (currentIco) {
    return cy.wrap(currentIco);
  }

  return cy
    .getTemporaryIco({
      kyc: {
        type: 'NONE',
      },
    })
    .then((ico) => {
      currentIco = ico;
      return ico;
    });
});
