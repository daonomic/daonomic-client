const Wallet = require('ethereumjs-wallet');

module.exports = Wallet.fromPrivateKey(
  new Buffer(
    '00120de4b1518cf1f16dc1b02f6b4a8ac29e870174cb1d8575f578480930250a',
    'hex',
  ),
);
