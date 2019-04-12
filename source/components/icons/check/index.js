// @flow
import cns from 'classnames';
import React from 'react';
import { SVGInjector } from '~/components/svg-injector';
import check from './check.svg';
import styles from './style.css';

type Props = {
  className?: string,
};

export function Check(props: Props) {
  const { className, ...restProps } = props;

  return (
    <SVGInjector
      className={cns(styles.root, className)}
      src={check}
      {...restProps}
    />
  );
}
