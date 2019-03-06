// @flow
import * as React from 'react';
import cn from 'classnames';
import { Page } from '@daonomic/ui';
import { Footer } from '~/components/footer';
import styles from './layout.css';

type Props = {|
  children: React.Node,
|};

export function AuthLayout({ children }: Props) {
  return (
    <Page>
      <Page.Content>
        <div className={cn(styles.container, styles.content)}>{children}</div>
      </Page.Content>

      <Page.Footer>
        <Footer className={styles.container} />
      </Page.Footer>
    </Page>
  );
}
