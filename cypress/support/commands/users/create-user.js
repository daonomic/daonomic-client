import * as serverAPI from '../../server-api';

Cypress.Commands.add('createUser', ({ ico } = {}) => {
  let icoPromise;

  if (ico) {
    icoPromise = cy.wrap(ico);
  } else {
    icoPromise = cy.getCurrentIco();
  }

  return icoPromise.then((ico) =>
    serverAPI.createUser({ realmId: ico.realmId }).then((user) => ({
      ...user,
      ico,
    })),
  );
});
