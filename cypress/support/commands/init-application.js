Cypress.Commands.add('initApplication', ({ getIco } = {}) => {
  cy.wrap(null)
    .then(getIco || cy.getCurrentIco.bind(cy))
    .then(({ saleId, realmId }) => {
      cy.window().then((w) => {
        w.daonomic.config.saleId = saleId;
        w.daonomic.config.realmId = realmId;
        w.daonomic.init();
      });
    });
});
