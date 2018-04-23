module.exports = (selector) =>
  browser.waitForExist(selector, 5000).then(() => browser.element(selector));
