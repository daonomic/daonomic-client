import { api } from '../../../api';

Cypress.Commands.add('createUser', ({ ico } = {}) => {
  let icoPromise;

  if (ico) {
    icoPromise = cy.wrap(ico);
  } else {
    icoPromise = cy.getCurrentIco();
  }

  return icoPromise.then((ico) =>
    api.user.createUser({ realmId: ico.realmId }).then((user) => ({
      ...user,
      ico,
    })),
  );
});
