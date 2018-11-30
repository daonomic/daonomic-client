//@flow
import * as React from 'react';
import cn from 'classnames';
import styles from './styles.css';

type Props = {
  isMet: boolean,
  children: React.Node,
  className?: string,
};

export class CriteriaListItem extends React.Component<Props> {
  render() {
    const { className, children, isMet, ...restProps } = this.props;

    return (
      <li
        {...restProps}
        className={cn(className, styles.item, {
          [styles.item_met]: isMet,
        })}
      >
        {children}
      </li>
    );
  }
}
