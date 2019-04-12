//@flow
import * as React from 'react';
import cn from 'classnames';
import style from './style.css';

type Props = {
  className?: string,
};

export class IconContent extends React.Component<Props> {
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
          d="M19 9H5v2h14V9zm-4 4H5v2h10v-2z"
          fill="#fff"
        />
      </svg>
    );
  }
}
