// @flow
export type Form = {|
  jsonSchema: {},
  uiSchema: {},
|};

type StateNotSet = {| status: 'NOT_SET', countryRequired: boolean |};
type StateExternalKyc = {| status: 'EXTERNAL_KYC', url: string |};
type StateInternalKyc = {|
  status: 'INTERNAL_KYC',
  url: string,
  form: Form,
|};
type StateCivicKyc = {|
  status: 'CIVIC_KYC',
  url: string,
  applicationId: string,
|};
type StateSumAndSubstanceKyc = {|
  status: 'SUM_SUB_KYC',
  config: {},
|};
type StateOnReview = {| status: 'ON_REVIEW' |};
type StateDenied = {|
  status: 'DENIED',
  reason: string,
  childStatus: StateInternalKyc | StateExternalKyc,
|};
type StateAllowed = {| status: 'ALLOWED' |};

export type State =
  | StateNotSet
  | StateExternalKyc
  | StateInternalKyc
  | StateCivicKyc
  | StateSumAndSubstanceKyc
  | StateOnReview
  | StateDenied
  | StateAllowed;
