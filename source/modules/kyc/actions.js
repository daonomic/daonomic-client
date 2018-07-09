// @flow
import { api } from '~/api';
import { kyc } from '~/modules/kyc/store';

import type { UserId } from '~/types/auth';

export async function loadAndSetKycState({
  userId,
}: {
  userId: UserId,
}): Promise<void> {
  kyc.setState({ dataState: 'loading' });

  try {
    const { data: state } = await api.kyc.getStatus();

    if (state.status === 'DENIED') {
      const { data: internalKycFormData } = await api.kyc.getInternalKycData({
        baseUrl: state.url,
        userId,
      });

      kyc.setState({
        dataState: 'loaded',
        data: {
          status: 'DENIED',
          url: state.url,
          reason: state.reason,
          form: state.form,
          data: internalKycFormData,
        },
      });
    } else {
      kyc.setState({
        dataState: 'loaded',
        data: state,
      });
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
