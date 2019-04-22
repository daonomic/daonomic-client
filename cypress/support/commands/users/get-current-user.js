import { api } from '../../../api';

let currentUser;

Cypress.Commands.add('getCurrentUser', () => {
  if (currentUser) {
    return currentUser;
  }

  return cy
    .wrap(null)
    .then(cy.getCurrentIco.bind(cy))
    .then(({ realmId }) => api.user.createUser({ realmId }))
    .then((user) => {
      currentUser = user;
      return user;
    });
});
