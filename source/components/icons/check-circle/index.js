// @flow
import cns from 'classnames';
import React from 'react';
import { SVGInjector } from '~/components/svg-injector';
import checkCircle from './check-circle.svg';
import styles from './style.css';

type Props = {
  className?: string,
};

export function CheckCircle(props: Props) {
  const { className, ...restProps } = props;

  return (
    <SVGInjector
      className={cns(styles.root, className)}
      src={checkCircle}
      {...restProps}
    />
  );
}
