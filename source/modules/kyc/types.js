// @flow
export type State =
  | { status: 'NOT_SET' }
  | { status: 'EXTERNAL_KYC', url: string }
  | { status: 'INTERNAL_KYC', url: string, fields: [] }
  | { status: 'ON_REVIEW' }
  | { status: 'DENIED', reason: string }
  | { status: 'ALLOWED' };
