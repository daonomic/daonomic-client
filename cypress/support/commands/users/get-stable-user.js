import { createUser } from '../../server-api';

let stableUser;

Cypress.Commands.add('getStableUser', () => {
  if (stableUser) {
    return stableUser;
  }

  return cy
    .wrap(null)
    .then(cy.getCurrentIco.bind(cy))
    .then(({ realmId }) => createUser({ realmId }))
    .then((user) => {
      stableUser = user;
      return user;
    });
});
