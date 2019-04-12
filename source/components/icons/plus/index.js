//@flow
import * as React from 'react';
import cn from 'classnames';
import style from './style.css';

type Props = {
  className?: string,
};

export class IconPlus extends React.Component<Props> {
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
          fill="#fff"
          fillRule="evenodd"
          d="M13 6h-2v5H6v2h5v5h2v-5h5v-2h-5V6z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
}
