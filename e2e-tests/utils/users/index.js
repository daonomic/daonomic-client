const { createUser } = require('../../server-api');
const { getCurrentIco } = require('../icos');

let stableUser;

async function getStableUser() {
  if (stableUser) {
    return stableUser;
  }

  const { realmId } = await getCurrentIco();

  stableUser = createUser({ realmId }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(`Failed to create user in realm ${realmId}`, error);
    throw error;
  });

  return stableUser;
}

async function getTemporaryUser(options = { getIco: getCurrentIco }) {
  const { getIco } = options;
  const { realmId } = await getIco();
  const user = await createUser({ realmId }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(`Failed to create user in realm ${realmId}`, error);
    throw error;
  });

  return user;
}

module.exports = {
  getStableUser,
  getTemporaryUser,
};
