// @flow
import { loadScript } from '~/domains/app/assets';
import { env } from '~/domains/app/config';

let areAssetsLoaded = false;

export async function initSumsub(): Promise<any> {
  if (!areAssetsLoaded) {
    await loadScript(
      `https://${
        env === 'production' ? '' : 'test-'
      }api.sumsub.com/idensic/static/sumsub-kyc.js`,
    );

    areAssetsLoaded = true;
  }

  return window.idensic;
}
