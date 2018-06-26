// @flow
import { autorun } from 'mobx';
import { kyc } from '~/modules/kyc/store';

import type { IAuth } from '~/stores/auth/types';

export { getDefaultFieldValue } from './get-default-field-value';
export { validateInternalKycForm } from './internal-kyc-validation';

export function initKyc(auth: IAuth) {
  autorun(() => {
    if (!auth.isAuthenticated) {
      kyc.reset();
    }
  });
}
