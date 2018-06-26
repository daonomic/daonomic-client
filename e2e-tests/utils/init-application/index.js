const { getCurrentIco } = require('../icos');

module.exports = async function initApplication({
  getIco = getCurrentIco,
} = {}) {
  const { saleId, realmId } = await getIco();

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
