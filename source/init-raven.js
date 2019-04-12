import raven from 'raven-js';
import { config, environment } from '~/domains/app/config';

export const initRaven = (onRun) => {
  raven.config(config.sentryDsn).install();
  raven.setTagsContext({
    client_env: environment,
    realmId: config.realmId,
  });
  raven.context(onRun);
};
