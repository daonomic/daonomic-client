// @flow
import { authApi } from './api';
import { AuthStore } from './store';
import { authToken } from './store/token';
export { registrationService } from './services/registration';

export const auth = new AuthStore({ api: authApi, authToken });
