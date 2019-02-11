// @flow
import { loadScript } from '~/domains/app/assets';

let areAssetsLoaded = false;

export async function initSumsub(): Promise<any> {
  if (!areAssetsLoaded) {
    await loadScript(
      'https://test-api.sumsub.com/idensic/static/sumsub-kyc.js',
    );

    areAssetsLoaded = true;
  }

  return window.idensic;
}
