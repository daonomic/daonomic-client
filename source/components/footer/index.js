import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Translation from '~/components/translation';
import { termsOfServiceURL } from '~/config/common';
import Logo from '~/components/logo';
import styles from './footer.css';

export default class Footer extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

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
            <Translation id="poweredBy" />
            {' '}
            <Logo className={styles.logo} />
          </div>

          {this.renderTermsOfServiceLink()}
        </div>
      </div>
    );
  }
}
