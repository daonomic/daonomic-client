// @flow

import raven from 'raven-js';

export const logError = (error: Error) => {
  // eslint-disable-next-line
  console.error('CLIENT ERROR OCCURED');
  // eslint-disable-next-line
  console.error(error);

  raven.captureBreadcrumb({
    message: error.message || 'unknown error',
  });
  raven.captureException(error);
};
