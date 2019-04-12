// @flow
import cns from 'classnames';
import React from 'react';
import { SVGInjector } from '~/components/svg-injector';
import arrowRight from './right-arrow.svg';
import styles from './style.css';

type Props = {
  className?: string,
};

export function ArrowRight(props: Props) {
  const { className, ...restProps } = props;

  return (
    <SVGInjector
      className={cns(styles.root, className)}
      src={arrowRight}
      {...restProps}
    />
  );
}
