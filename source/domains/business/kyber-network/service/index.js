// @flow

import * as kyberNetworkApi from '../api';
import type { IKyberNetworkService } from '../types';

class KyberNetworkService implements IKyberNetworkService {
  getAvailableCurrencies = () => {
    return kyberNetworkApi.getAvailableCurrencies();
  };

  getSellRates = ({ id, qty }) => {
    return kyberNetworkApi.getSellRate({ id, qty });
  };

  getBuyRate = ({ id, qty }) => {
    return kyberNetworkApi.getBuyRate({ id, qty });
  };
}

export const kyberNetworkService = new KyberNetworkService();
