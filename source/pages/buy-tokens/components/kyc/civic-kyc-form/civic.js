// @flow
import { loadScript, loadStylesheet } from '~/domains/app/assets';

let areCivicAssetsLoaded = false;

export async function initCivicSip({
  applicationId,
}: {
  applicationId: string,
}): Promise<any> {
  if (!areCivicAssetsLoaded) {
    await Promise.all([
      loadStylesheet('https://hosted-sip.civic.com/css/civic-modal.min.css'),
      loadScript('https://hosted-sip.civic.com/js/civic.sip.min.js'),
    ]);

    areCivicAssetsLoaded = true;
  }

  return new window.civic.sip({ appId: applicationId });
}
