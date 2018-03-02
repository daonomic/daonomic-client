// @flow
export type KycFormFieldName = string;
export type KycFormFieldValue = string | string[] | boolean;
export type KycFormField = {
  name: KycFormFieldName,
  label: string,
  type: 'STRING' | 'FILE' | 'BOOLEAN' | 'SELECT',
  values?: string[],
  required: boolean,
};

export type GetKycDataResponse = {
  data: {
    allowed: boolean,
    denialReason?: string,
    status:
      | 'NOT_SET'
      | 'NO_KYC'
      | 'ON_REVIEW'
      | 'DENIED'
      | 'CONFIRMED'
      | 'PROCESSING'
      | 'COMPLETED',
    data?: {
      [key: KycFormFieldName]: KycFormFieldValue,
    },
  },
};

export type SetKycDataParams = {
  [key: KycFormFieldName]: KycFormFieldValue,
};

export type SetKycDataResponse = {
  data: {},
};

export type SetKycDataResponseError = {
  response: {
    data: {
      fieldErrors?: {
        [key: KycFormFieldName]: string[],
      },
    },
  },
};
