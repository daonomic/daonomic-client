import { config } from '~/domains/app/config';
import { init } from './init';
import { initRaven } from './init-raven';

if (process.env.E2E_TEST) {
  window.daonomic = {
    config,
    init,
  };
} else if (process.env.NODE_ENV === 'production') {
  initRaven(() => {
    init();
  });
} else {
  init();
}
