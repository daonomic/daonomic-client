// @flow
import * as React from 'react';
import cn from 'classnames';
import { Page } from '@daonomic/ui';
import Header from '~/components/header';
import { Footer } from '~/components/footer';
import styles from './app-layout.css';

type Props = {
  children: React.Node,
};

export default class AppLayout extends React.Component<Props, {}> {
  render() {
    const { children } = this.props;

    return (
      <Page>
        <Page.Header>
          <div className={cn(styles.container, styles.header)}>
            <Header />
          </div>
        </Page.Header>

        <Page.Content>
          <div className={styles.container}>{children}</div>
        </Page.Content>

        <Page.Footer>
          <Footer className={styles.container} />
        </Page.Footer>
      </Page>
    );
  }
}
