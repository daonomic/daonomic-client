const { createIco } = require('../../server-api');
const getRandomInt = require('../get-random-int');

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
let currentIco = null;

function getCurrentIco() {
  if (currentIco) {
    return currentIco;
  }

  currentIco = createIco({
    start: Date.now() - getRandomInt(1000, 5000),
    end: Date.now() + hour * getRandomInt(1, 50),
    tokensCount: getRandomInt(10000, 50000),
  }).catch((error) => {
    console.error('Failed to create ICO', error); // eslint-disable-line
    currentIco = null;
    throw error;
  });

  return currentIco;
}

function getTemporaryIco({
  start = Date.now() - getRandomInt(1000, 5000),
  end = Date.now() + hour * getRandomInt(1, 50),
  tokensCount = getRandomInt(10000, 50000),
  kycFormSchema,
}) {
  return createIco({
    start,
    end,
    tokensCount,
    kycFormSchema,
  }).catch((error) => {
    console.error('Failed to create ICO', error); // eslint-disable-line
    throw error;
  });
}

module.exports = {
  getCurrentIco,
  getTemporaryIco,
};
