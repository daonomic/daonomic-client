// @flow
import { api } from '~/api';
import { kyc } from '~/modules/kyc/store';

export async function loadAndSetKycState(): Promise<void> {
  kyc.setState({ dataState: 'loading' });

  try {
    const { data: state } = await api.kyc.getStatus();

    kyc.setState({
      dataState: 'loaded',
      data: state,
    });
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
