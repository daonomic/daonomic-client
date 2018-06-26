// @flow
export type KycFormFieldName = string;
export type KycFormFieldValue = string | string[] | boolean;

export type BaseKycFormField = {|
  type: string,
  name: KycFormFieldName,
  label: string,
  required: boolean,
|};
export type KycFormFieldString = {|
  ...BaseKycFormField,
  type: 'STRING',
  value: string,
  values?: string[],
  error: string,
|};
export type KycFormFieldFile = {|
  ...BaseKycFormField,
  type: 'FILE',
  value: string[],
  error: string,
|};
export type KycFormFieldBoolean = {|
  ...BaseKycFormField,
  type: 'BOOLEAN',
  value: boolean,
  error: string,
|};

export type KycFormField =
  | KycFormFieldString
  | KycFormFieldFile
  | KycFormFieldBoolean;

export type KycStatus =
  | 'NOT_SET'
  | 'NO_KYC'
  | 'ON_REVIEW'
  | 'DENIED'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'COMPLETED';

export type UserStatus = 'NOT_SET' | 'ON_REVIEW' | 'ALLOWED' | 'DENIED';
