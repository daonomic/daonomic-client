// @flow
import * as React from 'react';
import cn from 'classnames';
import descriptionToMarkup from './utils/description-to-markup';
import styles from './styles.css';

type Props = {|
  className?: string,
  children?: string,
|};

export class UnstyledFieldDescription extends React.Component<Props> {
  render() {
    const { children, ...restProps } = this.props;

    if (!children) {
      return null;
    }

    return (
      <span
        {...restProps}
        dangerouslySetInnerHTML={{
          __html: descriptionToMarkup(children),
        }}
      />
    );
  }
}

export class FieldDescription extends React.Component<Props> {
  render() {
    const { className, ...restProps } = this.props;

    return (
      <UnstyledFieldDescription
        {...restProps}
        className={cn(className, styles.root)}
      />
    );
  }
}
