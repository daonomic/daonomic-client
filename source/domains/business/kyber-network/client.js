import axios from 'axios';
import { baseKyberNetworkUrl } from '~/domains/app/config/api';

export const kyberNetworkClient = axios.create({
  baseURL: baseKyberNetworkUrl,
});
