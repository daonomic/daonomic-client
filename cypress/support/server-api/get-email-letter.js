export function getEmailLetter({ account, content }) {
  return cy
    .request('POST', 'http://ops:9090/mails/waitOne', {
      email: account,
      content,
    })
    .then(({ body }) => body);
}
