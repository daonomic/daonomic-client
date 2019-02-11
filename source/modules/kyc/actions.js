// @flow
import { api } from '~/domains/app/api';
import { kyc } from '~/modules/kyc/store';

export async function loadAndSetKycState(): Promise<void> {
  if (kyc.state.dataState === 'initial') {
    kyc.setState({ dataState: 'loading' });
  }

  try {
    const { data: state } = await api.kyc.getStatus();

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

    if (['ON_REVIEW', 'SUM_SUB_KYC'].includes(state.status)) {
      setTimeout(loadAndSetKycState, 1000);
    }
  } catch (error) {
    kyc.setState({ dataState: 'failed' });
  }
}

export async function setInternalKycData({
  data,
  url,
}: {
  data: {},
  url: string,
}) {
  await api.kyc.setInternalKycData({
    data,
    url,
  });
  await api.kyc.sendToReview();
}
