import raven from 'raven-js';
import { config, env } from '~/domains/app/config';

export const initRaven = (onRun) => {
  raven.config(config.sentryDsn).install();
  raven.setTagsContext({
    client_env: env,
    realmId: config.realmId,
  });
  raven.context(onRun);
};
