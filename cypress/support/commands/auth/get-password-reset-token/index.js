import { getEmailLetter } from '../../../server-api';
import { extractTokenFromLetter } from './extract-token-from-letter';

Cypress.Commands.add('getPasswordResetToken', ({ email }) => {
  return getEmailLetter({ account: email, content: 'password' }).then(
    extractTokenFromLetter,
  );
});
