const { createUser } = require('../../server-api');
const getCurrentIco = require('../get-current-ico');

let currentUser;

module.exports = async function getCurrentUser() {
  if (currentUser) {
    return currentUser;
  }

  const { realmId } = await getCurrentIco();

  currentUser = createUser({ realmId }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(`Failed to create user in realm ${realmId}`, error);
    throw error;
  });

  return currentUser;
};
