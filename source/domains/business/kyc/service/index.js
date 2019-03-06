// @flow
import { init } from './init';
import { setInternalKycData } from './set-internal-kyc-data';
import { loadKycState } from './load-kyc-state';

export const kycService = {
  init,
  setInternalKycData,
  loadKycState,
};
