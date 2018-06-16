// @flow
import { api } from '~/api';
import { kyc } from '~/modules/kyc/store';

export async function loadAndSetKycState(): Promise<void> {
  kyc.setDataState('loading');

  try {
    const { data: state } = await api.kyc.getStatus();

    kyc.setState(state);
    kyc.setDataState('loaded');
  } catch (error) {
    kyc.setDataState('failed');
  }
}
