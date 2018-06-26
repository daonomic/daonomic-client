// @flow
export type FieldName = string;
export type FieldValue = string | string[] | boolean;

export type BaseField = {|
  type: 'STRING' | 'BOOLEAN' | 'FILE',
  name: FieldName,
  label: string,
  required: boolean,
|};

export type FieldString = {|
  ...BaseField,
  type: 'STRING',
  value: string,
  values?: string[],
  error: string,
|};

export type FieldFile = {|
  ...BaseField,
  type: 'FILE',
  value: string[],
  error: string,
|};

export type FieldBoolean = {|
  ...BaseField,
  type: 'BOOLEAN',
  value: boolean,
  error: string,
|};

export type Field = FieldString | FieldFile | FieldBoolean;

export type InternalKycFormData = {|
  [key: FieldName]: FieldValue,
|};

export type State =
  | { status: 'NOT_SET' }
  | { status: 'EXTERNAL_KYC', url: string }
  | { status: 'INTERNAL_KYC', url: string, fields: BaseField[] }
  | { status: 'ON_REVIEW' }
  | {
      status: 'DENIED',
      reason: string,
      url: string,
      fields: BaseField[],
      data: InternalKycFormData,
    }
  | { status: 'ALLOWED' };
