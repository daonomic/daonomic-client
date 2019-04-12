// @flow
import cns from 'classnames';
import React from 'react';
import { SVGInjector } from '~/components/svg-injector';
import attention from './attention.svg';
import styles from './style.css';

type Props = {
  className?: string,
};

export function Attention(props: Props) {
  const { className, ...restProps } = props;

  return (
    <SVGInjector
      className={cns(styles.root, className)}
      src={attention}
      {...restProps}
    />
  );
}
