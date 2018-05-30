// @flow
import * as React from 'react';
import cn from 'classnames';
import textStyles from '~/components/text/text.css';

type UnstyledLinkProps = {
  href: string,
  target?: string,
  onPushHistory(string): any,
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
      this.props.onPushHistory(this.props.href);
    }
  };

  render() {
    const {
      onPushHistory, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;

    return <a {...restProps} onClick={this.handleClick} />;
  }
}
