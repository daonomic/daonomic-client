let currentIco = null;

Cypress.Commands.add('getCurrentIco', () => {
  if (currentIco) {
    return cy.wrap(currentIco);
  }

  return cy.createIco().then((ico) => {
    currentIco = ico;
    return ico;
  });
});
