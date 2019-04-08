// @flow

import * as React from 'react';

type Props = {
  as?: string | React.ElementType,
  marker: string,
  innerRef?: Function,
};

export function MarkerableComponent(props: Props) {
  const Comp = props.as || 'div';

  const { marker, ...restProps } = props;

  return <Comp data-marker={marker} ref={props.innerRef} {...restProps} />;
}
