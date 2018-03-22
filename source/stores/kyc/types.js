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
  savingState: DataState;
  kycServerUrl: string;
  status: UserStatus;
  denialReason: string;
  formSchema: BaseKycFormField[];
  formData: Map<KycFormFieldName, KycFormFieldValue>;
  formErrors: Map<KycFormFieldName, string>;
}
