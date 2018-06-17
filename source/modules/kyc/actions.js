// @flow
import { api } from '~/api';
import { kyc } from '~/modules/kyc/store';

import type { InternalKycFormData } from '~/modules/kyc/types';
import type { UserId } from '~/types/auth';

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
