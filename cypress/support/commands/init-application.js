Cypress.Commands.add('initApplication', ({ ico } = {}) => {
  cy.wrap(null)
    .then(ico ? () => cy.wrap(ico) : cy.getCurrentIco)
    .then(({ realmId }) => {
      cy.window().then((w) => {
        w.daonomicConfig.realm = realmId;
        w.daonomic.init();
      });
    });
});
