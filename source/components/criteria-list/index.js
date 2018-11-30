//@flow
import * as React from 'react';
import cn from 'classnames';
import { CriteriaListItem } from './item';
import styles from './styles.css';

type Props = {
  children: React.Node,
  className?: string,
};

export class CriteriaList extends React.Component<Props> {
  static Item = CriteriaListItem;

  render() {
    const { className, children, ...restProps } = this.props;

    return (
      <ul {...restProps} className={cn(className, styles.root)}>
        {children}
      </ul>
    );
  }
}
