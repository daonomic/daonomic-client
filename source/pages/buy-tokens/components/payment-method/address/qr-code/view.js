//@flow
import * as React from 'react';
import cn from 'classnames';
import styles from './styles.css';

export type Props = {
  qrCode: string,
  className?: string,
};

export class QrCode extends React.Component<Props> {
  render() {
    const { qrCode, className, ...restProps } = this.props;

    if (!qrCode) {
      return null;
    }

    return (
      <img
        {...restProps}
        className={cn(className, styles.root)}
        src={qrCode}
        alt="QR code"
      />
    );
  }
}
