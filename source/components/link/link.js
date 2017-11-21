import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link as ReactRouterLink } from 'react-router-dom';
import textStyles from '~/components/text/text.css';

export default class Link extends PureComponent {
  static propTypes = {
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

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
