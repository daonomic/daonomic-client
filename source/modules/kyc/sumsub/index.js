// @flow
import { loadScript } from '~/domains/app/assets';
import { environment } from '~/domains/app/config';

let areAssetsLoaded = false;

export async function initSumsub(): Promise<any> {
  if (!areAssetsLoaded) {
    await loadScript(
      `https://${
        environment === 'production' ? '' : 'test-'
      }api.sumsub.com/idensic/static/sumsub-kyc.js`,
    );

    areAssetsLoaded = true;
  }

  return window.idensic;
}
