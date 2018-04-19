// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import history from '~/router/history';
import textStyles from '~/components/text/text.css';

type UnstyledLinkProps = {
  href: string,
  target?: string,
  onClick?: Function,
};

type LinkProps = UnstyledLinkProps & {
  className?: string,
};

export default class Link extends React.Component<LinkProps> {
  render() {
    const { className } = this.props;

    return (
      <UnstyledLink
        {...this.props}
        className={cn(textStyles.link, className)}
      />
    );
  }
}

const isModifiedEvent = (event: MouseEvent) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export class UnstyledLink extends React.Component<UnstyledLinkProps> {
  static propTypes = {
    href: PropTypes.string.isRequired,
    target: PropTypes.string,
    onClick: PropTypes.func,
  };

  handleClick = (event: MouseEvent) => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(event);
    }

    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();
      history.push(this.props.href);
    }
  };

  render = () => {
    return <a {...this.props} onClick={this.handleClick} />;
  };
}
