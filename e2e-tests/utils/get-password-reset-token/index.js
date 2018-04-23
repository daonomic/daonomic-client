const serverApi = require('../../server-api');

const tokenMatchingRegexp = /href="http[^"]+sign\/create-new-password\/([^"]+)"/;

module.exports = function getPasswordResetToken({ email }) {
  return serverApi
    .getEmailLetter({ account: email, content: 'password' })
    .then((letterContent) => {
      const [, token] = letterContent.match(tokenMatchingRegexp) || [];

      return token;
    });
};
