const { createIco } = require('../../server-api');

let currentIco = null;

function getRandomInt(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

module.exports = function getCurrentIco() {
  if (currentIco) {
    return currentIco;
  }

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;

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
};
