import ProviderEngine from 'web3-provider-engine';
import WalletSubprovider from 'web3-provider-engine/subproviders/wallet';
import ProviderSubprovider from 'web3-provider-engine/subproviders/provider';
import FilterSubprovider from 'web3-provider-engine/subproviders/filters';
import Web3 from 'web3';
import wallet from './wallet';

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

window.web3 = web3;
window.Web3 = Web3;
window.wallet = wallet;
