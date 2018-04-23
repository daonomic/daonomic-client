import config from '~/config';
import { init } from './init';

if (process.env.E2E_TEST) {
  window.daonomic = {
    config,
    init,
  };
} else {
  init();
}
