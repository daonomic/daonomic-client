// @flow
export type Response<Data> = Promise<{|
  data: Data,
  headers: {
    [key: string]: string,
  },
|}>;

export interface IApiClient {
  get(path: string, options?: {}): Response<any>;
  post(path: string, body: mixed, options?: {}): Response<any>;
}
