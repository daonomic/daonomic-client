// @flow
import { api } from '~/domains/app/api';
import { kyc } from '~/modules/kyc/store';

export async function loadAndSetKycState(): Promise<void> {
  if (kyc.state.dataState === 'initial') {
    kyc.setState({ dataState: 'loading' });
  }

  try {
    const { data: state } = await api.kyc.getStatus();

    kyc.setState({
      dataState: 'loaded',
      data: state,
    });

    if (state.status === 'ON_REVIEW') {
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
