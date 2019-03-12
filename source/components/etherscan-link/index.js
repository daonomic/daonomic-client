//@flow
import * as React from 'react';
import cn from 'classnames';
import { Tooltip, IconArrowPopout } from '@daonomic/ui';
import styles from './styles.css';

type Props = {|
  href: string,
  className?: string,
|};

export function EtherscanLink({ href, className, ...restProps }: Props) {
  return (
    <Tooltip placement="top" trigger={['hover']} overlay="View on Etherscan">
      <a
        {...restProps}
        className={cn(className, styles.root)}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconArrowPopout className={styles.icon} />
      </a>
    </Tooltip>
  );
}
