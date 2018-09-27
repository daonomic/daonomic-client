// @flow
import * as DataStateTypes from '~/modules/data-state/types';

export type Token = string;

export interface IReferralProgramService {
  userToken: DataStateTypes.LoadableData<Token>;
  referrerToken: ?Token;

  loadAndSetUserToken(): Promise<void>;
  reset(): void;
}
