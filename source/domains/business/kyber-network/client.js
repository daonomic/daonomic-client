import axios from 'axios';

export const kyberNetworkClient = axios.create({
  baseURL: 'https://api.kyber.network',
});
