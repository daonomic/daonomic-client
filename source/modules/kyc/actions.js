// @flow
import { api } from '~/api';
import { kyc } from '~/modules/kyc/store';

import type { InternalKycFormData } from '~/modules/kyc/types';
import type { UserId } from '~/types/auth';

export async function loadAndSetKycState({
  userId,
}: {
  userId: UserId,
}): Promise<void> {
  kyc.setDataState('loading');

  try {
    const { data: state } = await api.kyc.getStatus();

    if (state.status === 'DENIED') {
      const { data: internalKycFormData } = await api.kyc.getInternalKycData({
        baseUrl: state.url,
        userId,
      });

      kyc.setState({
        status: 'DENIED',
        url: state.url,
        reason: state.reason,
        fields: state.fields,
        data: internalKycFormData,
      });
    } else {
      kyc.setState(state);
    }

    kyc.setDataState('loaded');
  } catch (error) {
    kyc.setDataState('failed');
  }
}

export async function setInternalKycData({
  data,
  baseUrl,
  userId,
}: {
  data: InternalKycFormData,
  baseUrl: string,
  userId: UserId,
}) {
  await api.kyc.setInternalKycData({
    data,
    baseUrl,
    userId,
  });
  await api.kyc.sendToReview();
}
