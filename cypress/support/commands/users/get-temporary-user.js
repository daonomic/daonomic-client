import { createUser } from '../../server-api';

Cypress.Commands.add(
  'getTemporaryUser',
  ({ getIco } = { getIco: cy.getCurrentIco.bind(cy) }) => {
    return getIco().then(({ realmId }) => createUser({ realmId }));
  },
);
