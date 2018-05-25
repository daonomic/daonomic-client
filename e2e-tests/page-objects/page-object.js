const initApplication = require('../utils/init-application');

class PageObject {
  constructor({ getUrl, marker }) {
    this.getUrl = getUrl;
    this.marker = marker;
  }

  async open(params) {
    if (!this.getUrl) {
      throw new Error(`Cannot open ${this.marker()} without url`);
    }

    await browser.url(this.getUrl(params));
    await browser.refresh();
    initApplication();
  }
}

module.exports = PageObject;
