import config from '~/config';
import { init } from './init';

if (process.env.E2E_TEST) {
  window.daonomic = {
    config,
    init,
  };
} else if (
  process.env.NODE_ENV === 'production' &&
  typeof (window.Raven || {}).context === 'function'
) {
  window.Raven.context(() => {
    init();
  });
} else {
  init();
}
