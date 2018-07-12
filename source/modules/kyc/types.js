// @flow
export type Form = {|
  jsonSchema: {},
  uiSchema: {},
|};

export type State =
  | { status: 'NOT_SET' }
  | { status: 'EXTERNAL_KYC', url: string }
  | {
      status: 'INTERNAL_KYC',
      url: string,
      form: Form,
    }
  | { status: 'ON_REVIEW' }
  | {
      status: 'DENIED',
      reason: string,
      url: string,
      form: Form,
    }
  | { status: 'ALLOWED' };
