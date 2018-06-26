const ProviderEngine = require('web3-provider-engine');
const WalletSubprovider = require('web3-provider-engine/subproviders/wallet');
const ProviderSubprovider = require('web3-provider-engine/subproviders/provider');
const FilterSubprovider = require('web3-provider-engine/subproviders/filters');
const Web3 = require('web3');
const wallet = require('./wallet');

function createEngine(url, wallet) {
  Web3.providers.HttpProvider.prototype.sendAsync =
    Web3.providers.HttpProvider.prototype.send; // https://github.com/ethereum/web3.js/issues/1119

  const engine = new ProviderEngine();
  const web3 = new Web3(engine);

  engine.addProvider(new WalletSubprovider(wallet, {}));
  engine.addProvider(new FilterSubprovider());
  engine.addProvider(
    new ProviderSubprovider(new Web3.providers.HttpProvider(url)),
  );
  engine.on('error', function(err) {
    console.error(err.stack); // eslint-disable-line no-console
  });

  return { web3, engine };
}

const { web3, engine } = createEngine('http://ops:8545', wallet);

engine.start();

module.exports = { web3 };
