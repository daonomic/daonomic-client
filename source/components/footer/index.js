// @flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import cn from 'classnames';
import { LanguageSelect } from '~/components/language-select';
import config from '~/domains/app/config';
import styles from './footer.css';

type Props = {|
  className?: string,
|};

export class Footer extends React.PureComponent<Props> {
  renderTermsOfServiceLink = () => {
    if (!config.termsOfServiceUrl) {
      return null;
    }

    return (
      <li className={styles.item}>
        <a
          href={config.termsOfServiceUrl}
          target="_blank"
          rel="noreferrer noopener"
          className={styles.link}
        >
          <Trans>Terms of Service</Trans>
        </a>
      </li>
    );
  };

  render() {
    const { className } = this.props;

    return (
      <div className={cn(className, styles.root)}>
        <div className={styles.inner}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Trans>Powered by</Trans>{' '}
              <a
                href={config.daonomicUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.link}
              >
                Ðaonomic
              </a>
            </li>
            {this.renderTermsOfServiceLink()}
          </ul>

          <LanguageSelect />
        </div>
      </div>
    );
  }
}
