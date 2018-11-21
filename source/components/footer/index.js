// @flow
import * as React from 'react';
import cn from 'classnames';
import config from '~/domains/app/config';
import styles from './footer.css';
import { getTranslation } from '~/domains/app/i18n';

type Props = {|
  className?: string,
|};

export class Footer extends React.PureComponent<Props> {
  renderTermsOfServiceLink = () => {
    if (!config.termsOfServiceUrl) {
      return null;
    }

    return (
      <p>
        <a
          href={config.termsOfServiceUrl}
          target="_blank"
          rel="noreferrer noopener"
          className={styles.link}
        >
          {getTranslation('common:termsOfService')}
        </a>
      </p>
    );
  };

  render() {
    const { className } = this.props;

    return (
      <div className={cn(className, styles.root)}>
        <div className={styles.inner}>
          <p>
            {getTranslation('common:poweredBy')}{' '}
            <a
              href={config.daonomicUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.link}
            >
              Ðaonomic
            </a>
          </p>

          {this.renderTermsOfServiceLink()}
        </div>
      </div>
    );
  }
}
