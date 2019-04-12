//@flow
import * as React from 'react';
import cn from 'classnames';
import style from './style.css';

type Props = {
  className?: string,
};

export class IconSettings extends React.Component<Props> {
  render() {
    const { className, ...restProps } = this.props;

    return (
      <svg
        {...restProps}
        className={cn(className, style.root)}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.0622 8.5L12 5 5.93782 8.5v7L12 19l6.0622-3.5v-7zM14 12c0 1.1046-.8954 2-2 2s-2-.8954-2-2 .8954-2 2-2 2 .8954 2 2z"
          fill="#fff"
        />
      </svg>
    );
  }
}
