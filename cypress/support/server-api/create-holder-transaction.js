import { baseAdminApiUrl } from '../../config';

export const createHolderTransaction = (tokenId, authToken, data) =>
  cy.request({
    method: 'POST',
    url: `${baseAdminApiUrl}/v1/tokens/${tokenId}/pools/createHolder`,
    body: {
      amount: data.amount,
      address: data.address,
      name: data.name,
    },
    headers: {
      'X-AUTH-TOKEN': authToken,
    },
  });
