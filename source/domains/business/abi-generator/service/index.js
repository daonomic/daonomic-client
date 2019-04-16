// @flow

class AbiGeneratorService {
  createTradeAndBuyAbi = () => ({
    constant: false,
    inputs: [
      { name: '_kyberProxy', type: 'address' },
      { name: '_sale', type: 'address' },
      { name: 'srcToken', type: 'address' },
      { name: 'srcAmount', type: 'uint256' },
      { name: 'destToken', type: 'address' },
      { name: 'maxDestQty', type: 'uint256' },
      { name: 'minRate', type: 'uint256' },
      { name: 'buyer', type: 'address' },
    ],
    name: 'tradeAndBuy',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  });

  createAllowanceAbi = () => ({
    constant: true,
    inputs: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  });

  createBuyTokensAbi = () => ({
    constant: false,
    inputs: [
      {
        name: '_beneficiary',
        type: 'address',
      },
    ],
    name: 'buyTokens',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  });

  createApproveAbi = () => ({
    constant: false,
    inputs: [
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  });

  createReceiveErc20Abi = () => ({
    constant: false,
    inputs: [
      { name: '_beneficiary', type: 'address' },
      { name: '_token', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'receiveERC20',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  });

  createBalanceOfAbi = () => ({
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  });
}

export const abiGeneratorService = new AbiGeneratorService();
