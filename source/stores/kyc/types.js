// @flow
import type { DataState } from '~/types/common';
import type {
  UserStatus,
  BaseKycFormField,
  KycFormField,
  KycFormFieldName,
  KycFormFieldValue,
} from '~/types/kyc';

export interface IKyc {
  dataState: DataState;
  savingState: DataState;

  kycServerUrl: string;
  status: UserStatus;
  denialReason: string;

  +isDenied: boolean;
  +isAllowed: boolean;
  +isOnReview: boolean;

  +isExtended: boolean;
  +isSaving: boolean;
  +isSaved: boolean;
  +isLoading: boolean;
  +isLoaded: boolean;

  formSchema: BaseKycFormField[];
  formData: Map<KycFormFieldName, KycFormFieldValue>;
  formErrors: Map<KycFormFieldName, string>;
  +form: KycFormField[];

  loadKycInfo(): Promise<*>;
  loadData: () => void;
  saveData: () => void;
  validateForm: () => void;
  updateFormField(name: KycFormFieldName, value: KycFormFieldValue): void;
  reset: () => void;
  uploadFiles: (params: {
    files: File[],
    onUploadProgress: (event: ProgressEvent) => void,
  }) => Promise<*>;
  getFileUrlById: (id: string) => string;
}
