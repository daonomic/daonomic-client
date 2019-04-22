import { api } from '../../../../api';
import { extractTokenFromLetter } from './extract-token-from-letter';

Cypress.Commands.add('getPasswordResetToken', ({ email }) =>
  api.mail
    .getEmailLetter({ account: email, content: 'password' })
    .then(extractTokenFromLetter),
);
