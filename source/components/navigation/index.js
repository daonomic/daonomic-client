// @flow
import * as React from 'react';
import cn from 'classnames';
import styles from './navigation.css';
import NavigationItem from './navigation-item';

type Props = {
  children: React.Node,
  className?: string,
};

export class Navigation extends React.Component<Props, {}> {
  static Item = NavigationItem;

  render() {
    const { className, children, ...restProps } = this.props;

    return (
      <nav {...restProps} className={cn(className, styles.root)}>
        <ul className={styles.list}>
          {React.Children.map(children, (child) => (
            <li className={styles.item}>{child}</li>
          ))}
        </ul>
      </nav>
    );
  }
}
