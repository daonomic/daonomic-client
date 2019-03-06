// @flow
import { kycApi } from '~/domains/business/kyc/api';

export async function setInternalKycData({
  data,
  url,
}: {|
  data: {},
  url: string,
|}) {
  await kycApi.setInternalKycData({
    data,
    url,
  });
}
