// @flow
export type Form = {|
  jsonSchema: {},
  uiSchema: {},
|};

export type AllowedStatusCodes =
  | 'NOT_SET'
  | 'EXTERNAL_KYC'
  | 'INTERNAL_KYC'
  | 'CIVIC_KYC'
  | 'SUM_SUB_KYC'
  | 'ON_REVIEW'
  | 'DENIED'
  | 'PROCESSING'
  | 'ALLOWED'
  | 'KYC_NOT_CONFIGURED';

type StateBase = {|
  countryRequired?: boolean,
  config?: {},
  reason?: string,
  applicationId?: string,
  url?: string,
|};

type StateNotSet = {|
  ...StateBase,
  status: 'NOT_SET',
  countryRequired: boolean,
|};

type StateExternalKyc = {|
  ...StateBase,
  status: 'EXTERNAL_KYC',
|};

type StateInternalKyc = {|
  ...StateBase,
  status: 'INTERNAL_KYC',
  form: Form,
|};

type StateCivicKyc = {|
  ...StateBase,
  status: 'CIVIC_KYC',
|};

type StateSumAndSubstanceKyc = {|
  ...StateBase,
  status: 'SUM_SUB_KYC',
|};

type StateOnReview = {|
  ...StateBase,
  status: 'ON_REVIEW',
|};

type StateDenied = {|
  ...StateBase,
  status: 'DENIED',
  reason?: string,
  childStatus?: StateInternalKyc | StateExternalKyc | StateSumAndSubstanceKyc,
|};

type StateProcessing = {|
  ...StateBase,
  status: 'PROCESSING',
|};

type StateAllowed = {|
  ...StateBase,
  status: 'ALLOWED',
|};

type StateNotConfigured = {|
  ...StateBase,
  status: 'KYC_NOT_CONFIGURED',
|};

export type State =
  | StateNotSet
  | StateExternalKyc
  | StateInternalKyc
  | StateCivicKyc
  | StateSumAndSubstanceKyc
  | StateOnReview
  | StateProcessing
  | StateDenied
  | StateAllowed
  | StateNotConfigured;
