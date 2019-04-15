// @flow
import raven from 'raven-js';
import { env } from '~/domains/app/config';

class Logger {
  logError = (error: Error) => {
    // eslint-disable-next-line
    console.error('CLIENT ERROR OCCURED');
    // eslint-disable-next-line
    console.error(error);

    if (env === 'production') {
      raven.captureBreadcrumb({
        message: error.message || 'unknown error',
      });
      raven.captureException(error);
    }
  };

  logAction = ({
    title,
    description,
  }: {|
    title: string,
    description?: string,
  |}) => {
    // eslint-disable-next-line
    console.log('Action: ', title);
    if (description) {
      // eslint-disable-next-line
      console.log(description);
    }
  };
}

export const logger = new Logger();
