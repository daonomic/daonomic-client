// @flow
import * as React from 'react';
import cn from 'classnames';
import { Link as ReactRouterLink } from 'react-router-dom';
import textStyles from '~/components/text/text.css';

type Props = {
  href: string,
  className?: string,
};

export default class Link extends React.PureComponent<Props, {}> {
  render() {
    const { href, className, ...restProps } = this.props;

    return (
      <ReactRouterLink
        {...restProps}
        to={href}
        className={cn(textStyles.link, className)}
      />
    );
  }
}
