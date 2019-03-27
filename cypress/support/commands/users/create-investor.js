import { createInvestor } from '../../server-api';

Cypress.Commands.add('createInvestor', ({ ico } = {}) => {
  let icoPromise;

  if (ico) {
    icoPromise = cy.wrap(ico);
  } else {
    icoPromise = cy.getCurrentIco();
  }

  return icoPromise.then(({ realmId }) => createInvestor({ realmId }));
});
