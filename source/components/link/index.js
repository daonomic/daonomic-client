// @flow
import { inject } from 'mobx-react';
import { Link as LinkView, UnstyledLink as UnstyledLinkView } from './view';

import type { RouterStore } from '~/domains/app/router/store';

const injectLinkProps = inject(({ router }: { router: RouterStore }) => ({
  onPushHistory: router.history.push,
}));

export const Link = injectLinkProps(LinkView);
export const UnstyledLink = injectLinkProps(UnstyledLinkView);
