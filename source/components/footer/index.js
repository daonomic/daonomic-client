// @flow
import * as React from 'react';
import cn from 'classnames';
import Translation from '~/components/translation';
import config from '~/config';
import { Logo } from '@daonomic/ui';
import styles from './footer.css';

type Props = {
  className?: string,
};

export default class Footer extends React.PureComponent<Props, {}> {
  renderTermsOfServiceLink = () => {
    if (!config.termsOfServiceURL) {
      return null;
    }

    return (
      <div>
        <a href={config.termsOfServiceURL} className={styles.link}>
          <Translation id="termsOfService" />
        </a>
      </div>
    );
  };

  render() {
    const { className } = this.props;

    return (
      <div className={cn(className, styles.root)}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <Translation id="poweredBy" />{' '}
            <a
              href="https://daonomic.io"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Logo className={styles.logo} />
            </a>
          </div>

          {this.renderTermsOfServiceLink()}
        </div>
      </div>
    );
  }
}
