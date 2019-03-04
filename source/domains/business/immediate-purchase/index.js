// @flow
import { ImmediatePurchaseStore } from './store';

import type { IApi } from '~/domains/app/api/types';

export function immediatePurchaseProvider(api: IApi) {
  return new ImmediatePurchaseStore({ api });
}
