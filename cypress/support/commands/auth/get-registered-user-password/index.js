import { getEmailLetter } from '../../../server-api';
import { extractPasswordFromLetter } from './extract-password-from-letter';

Cypress.Commands.add('getRegisteredUserPassword', ({ email }) => {
  return getEmailLetter({ account: email, content: 'password' }).then(
    extractPasswordFromLetter,
  );
});
