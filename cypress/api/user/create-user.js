import { config } from '../../config';

export const createUser = ({ realmId }) =>
  cy
    .request({
      method: 'POST',
      url: `${config.baseTestUrl}/users`,
      body: {
        realm: realmId,
      },
    })
    .then(({ body }) => ({
      ...body,
      password: config.defaultUserPassword,
    }));
