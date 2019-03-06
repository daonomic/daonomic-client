// @flow
import axios from 'axios';

export function setInternalKycData({
  url,
  data,
}: {|
  url: string,
  data: {},
|}): Promise<void> {
  return axios.post(url, data).then((response) => response.data);
}
