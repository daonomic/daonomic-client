// @flow
import * as React from 'react';
import cn from 'classnames';
import Translation from '~/components/translation';
import { termsOfServiceURL } from '~/config';
import Logo from '~/components/logo';
import styles from './footer.css';

type Props = {
  className?: string,
};

export default class Footer extends React.PureComponent<Props, {}> {
  renderTermsOfServiceLink = () => {
    if (!termsOfServiceURL) {
      return null;
    }

    return (
      <div>
        <a href={termsOfServiceURL} className={styles.link}>
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
          <div>
            <Translation id="poweredBy" /> <Logo className={styles.logo} />
          </div>

          {this.renderTermsOfServiceLink()}
        </div>
      </div>
    );
  }
}
