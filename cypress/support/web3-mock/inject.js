import Web3 from 'web3';
import { web3 } from './engine';
import wallet from './wallet';

window.web3 = web3;
window.Web3 = Web3;
window.wallet = wallet;
