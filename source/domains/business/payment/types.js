// @flow
export type Payment = {|
  txHash: string,
  value: number,
  status: 'PENDING' | 'CONFIRMED' | 'EXECUTING' | 'COMPLETED' | 'ERROR',
  createDate: number,
|};
