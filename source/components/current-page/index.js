// @flow
import { inject, observer } from 'mobx-react';
import { CurrentPage as CurrentPageView } from './view';

import type { Props } from './view';
import type { RouterStore } from '~/domains/app/router/store';

export const CurrentPage = inject(
  ({ router }: {| router: RouterStore |}): Props => ({
    currentRoute: router.currentRoute,
  }),
)(observer(CurrentPageView));
