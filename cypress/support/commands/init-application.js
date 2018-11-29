Cypress.Commands.add('initApplication', ({ ico } = {}) => {
  cy.wrap(null)
    .then(ico ? () => cy.wrap(ico) : cy.getCurrentIco)
    .then(({ saleId, realmId }) => {
      cy.window().then((w) => {
        w.daonomic.config.saleId = saleId;
        w.daonomic.config.realmId = realmId;
        w.daonomic.init();
      });
    });
});
