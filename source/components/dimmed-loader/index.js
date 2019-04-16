// @flow
import * as React from 'react';

// $FlowFixMe
import { Trans } from '@lingui/macro';
import cn from 'classnames';
import styles from './styles.css';

export type Props = {|
  children: React.Node,
  preloader?: React.Node,
  active?: boolean,
  className?: string,
  rounded?: boolean,
|};

export const DimmedLoader = (props: Props) => {
  const { rounded, active, className, children, preloader, ...rest } = props;

  return (
    <div className={styles.wrapper}>
      <div
        className={cn(
          styles.dimmer,
          className,
          { [styles.dimmer_active]: active },
          { [styles.dimmer_rounded]: rounded },
        )}
        {...rest}
      >
        {preloader || (
          <p>
            <Trans>Loading..</Trans>
          </p>
        )}
      </div>
      {children}
    </div>
  );
};
