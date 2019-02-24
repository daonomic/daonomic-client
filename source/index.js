import raven from 'raven-js';
import { config } from '~/domains/app/config';
import { init } from './init';

if (process.env.E2E_TEST) {
  window.daonomic = {
    config,
    init,
  };
} else if (process.env.NODE_ENV === 'production') {
  raven
    .config('https://478b6a4ba91e4cacb4243a953781f896@sentry.io/1194582')
    .install();

  raven.context(() => {
    init();
  });
} else {
  init();
}
