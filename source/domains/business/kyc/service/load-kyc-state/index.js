// @flow
import { kyc } from '~/domains/business/kyc';
import { kycApi } from '~/domains/business/kyc/api';

export async function loadKycState(): Promise<void> {
  if (kyc.state.dataState === 'idle') {
    kyc.setState({ dataState: 'loading' });
  }

  try {
    const state = await kycApi.getStatus();

    if (
      kyc.state.dataState !== 'loaded' ||
      (kyc.state.dataState === 'loaded' &&
        kyc.state.data.status !== state.status)
    ) {
      kyc.setState({
        dataState: 'loaded',
        data: state,
      });
    }

    if (['ON_REVIEW', 'SUM_SUB_KYC', 'PROCESSING'].includes(state.status)) {
      setTimeout(loadKycState, 1000);
    }
  } catch (error) {
    kyc.setState({ dataState: 'failed' });
  }
}
