// @flow

import { kyberNetworkApi } from '../api';
import type { IKyberNetworkService } from '../types';

class KyberNetworkService implements IKyberNetworkService {
  getAvailableCurrencies = () => {
    const currencies = kyberNetworkApi.getAvailableCurrencies();

    return currencies;
  };

  getSellRate = async ({ id, qty }) => {
    const sellRate = await kyberNetworkApi.getSellRate({ id, qty });

    return sellRate.dst_qty[0];
  };

  getBuyRate = async ({ id, qty }) => {
    const buyRate = await kyberNetworkApi.getBuyRate({ id, qty });

    return buyRate.src_qty[0];
  };
}

export const kyberNetworkService = new KyberNetworkService();
