import { baseTestApiUrl } from '../../config';

export function createInvestor({ realmId }) {
  return cy
    .request({
      method: 'POST',
      url: `${baseTestApiUrl}/users`,
      body: {
        realm: realmId,
      },
    })
    .then(({ body }) => body);
}
