import { baseTestApiUrl } from '../../config';

export function getEmailLetter({ account, content }) {
  return cy
    .request('POST', `${baseTestApiUrl}/mails/waitOne`, {
      email: account,
      content,
    })
    .then(({ body }) => body);
}
