// @flow
import type { DataState } from '~/types/common';
import type {
  UserStatus,
  BaseKycFormField,
  KycFormFieldName,
  KycFormFieldValue,
} from '~/types/kyc';

export interface IKycState {
  dataState: DataState;
  kycServerUrl: string;
  status: UserStatus;
  prospectiveUserWalletAddress: string;
  userWalletAddress: string;
  denialReason: string;
  formSchema: BaseKycFormField[];
  formData: Map<KycFormFieldName, KycFormFieldValue>;
}
