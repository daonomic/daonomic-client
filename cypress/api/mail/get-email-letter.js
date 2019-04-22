import { config } from '../../config';

export const getEmailLetter = ({ account, content }) =>
  cy
    .request({
      method: 'POST',
      url: `${config.baseTestUrl}/mails/waitOne`,
      body: {
        email: account,
        content,
      },
    })
    .then((response) => response.body);
