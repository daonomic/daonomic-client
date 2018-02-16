// @flow
import * as React from 'react';
import cn from 'classnames';
import styles from './spoiler.css';

type Props = {
  className?: string,
  title?: string,
  children: React.Node,
};

type State = {
  isExpanded: boolean,
};

export default class Spoiler extends React.PureComponent<Props, State> {
  state = {
    isExpanded: false,
  };

  id = Math.random().toString();

  handleClick = () => {
    this.setState((state) => ({
      isExpanded: !state.isExpanded,
    }));
  };

  render() {
    const {
      className,
      title,
      children,
    } = this.props;
    const { isExpanded } = this.state;

    return (
      <section
        className={cn(className, styles.root, {
          [styles.root_expanded]: isExpanded,
        })}
      >
        <h3 className={styles.title}>
          <button
            aria-expanded={isExpanded}
            aria-controls={this.id}
            className={styles.button}
            onClick={this.handleClick}
          >
            {title}
          </button>
        </h3>

        <div
          aria-hidden={!isExpanded}
          id={this.id}
          className={styles.content}
        >
          {children}
        </div>
      </section>
    );
  }
}
