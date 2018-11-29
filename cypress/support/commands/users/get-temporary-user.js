import { createUser } from '../../server-api';

Cypress.Commands.add('getTemporaryUser', ({ ico } = {}) => {
  let icoPromise;

  if (ico) {
    icoPromise = cy.wrap(ico);
  } else {
    icoPromise = cy.getCurrentIco();
  }

  return icoPromise.then(({ realmId }) => createUser({ realmId }));
});
