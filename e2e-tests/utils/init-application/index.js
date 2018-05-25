const getCurrentIco = require('../get-current-ico');

module.exports = async function setupTestSuite() {
  const { saleId, realmId } = await getCurrentIco();

  return browser.execute(
    (saleId, realmId) => {
      window.daonomic.config.saleId = saleId;
      window.daonomic.config.realmId = realmId;
      window.daonomic.init();
    },
    saleId,
    realmId,
  );
};
