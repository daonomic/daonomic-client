// @flow
import createBrowserHistory from 'history/createBrowserHistory';

import type { IHistory } from '~/domains/app/router/types';

export const history: IHistory = createBrowserHistory();
