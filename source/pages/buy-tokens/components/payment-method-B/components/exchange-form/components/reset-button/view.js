// @flow

import * as React from 'react';
import styles from './styles.css';

// $FlowFixMe
import { Trans } from '@lingui/macro';

import type { ResetButtonProps } from './types';

export class ResetButtonView extends React.PureComponent<ResetButtonProps> {
  handleClick = (event: SyntheticInputEvent<HTMLSelectElement>) => {
    const { onClick } = this.props;

    event.preventDefault();
    onClick();
  };

  render() {
    return (
      <a className={styles.button} onClick={this.handleClick}>
        <Trans>Reset calculations</Trans>
      </a>
    );
  }
}
