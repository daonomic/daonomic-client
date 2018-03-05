// @flow
import type { BaseKycFormField } from '~/types/kyc';

export type PaymentParams = {|
  saleId: string,
  tokenId: string,
|};

export type GetIcoInfoResponse = {|
  kyc: BaseKycFormField[],
  kycUrl: string,
  current: number,
  total: number,
  startDate: number,
  endDate: number,
|};
