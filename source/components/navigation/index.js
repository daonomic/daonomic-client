// @flow
import * as React from 'react';
import cn from 'classnames';
import styles from './navigation.css';
import NavigationItem from './navigation-item';

type Props = {
  className?: string,
  children: React.Node,
};

export class Navigation extends React.Component<Props, {}> {
  static Item = NavigationItem;

  render() {
    const { className, children } = this.props;

    return (
      <nav className={cn(className, styles.root)}>
        <ul className={styles.list}>
          {React.Children.map(children, (child) => (
            <li className={styles.item}>{child}</li>
          ))}
        </ul>
      </nav>
    );
  }
}
