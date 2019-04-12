// @flow

import * as React from 'react';
import ReactSVG from 'react-svg';

type Props = {
  src: string,
  evalScripts?: 'always' | 'never',
  fallback?: () => React.Node,
  loading?: () => React.Node,
  onInjected?: (error: any, svg: any) => void,
  renumerateIRIElements?: boolean,
  svgClassName?: string,
  svgStyle?: {
    [key: string]: number | string,
  },
  wrapper?: string,
  className?: string,
  onClick?: () => void,
};

export function SVGInjector(props: Props) {
  return <ReactSVG {...props} />;
} 
