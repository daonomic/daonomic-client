import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Page from 'daonomic-ui/source/page';
import Footer from '~/components/footer';
import styles from './layout.css';

export default class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;

    return (
      <Page>
        <Page.Content>
          <div className={cn(styles.container, styles.content)}>
            {children}
          </div>
        </Page.Content>

        <Page.Footer>
          <Footer className={styles.container} />
        </Page.Footer>
      </Page>
    );
  }
}
