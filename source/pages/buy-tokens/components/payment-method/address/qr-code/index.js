//@flow
import * as React from 'react';
import cn from 'classnames';
import styles from './styles.css';

export type Props = {
  qrCodeUrl: string,
  className?: string,
};

// payment.state.selectedMethodAddressQRCode
export function QrCode({ qrCodeUrl, className, ...restProps }: Props) {
  return (
    <img
      {...restProps}
      className={cn(className, styles.root)}
      src={qrCodeUrl}
      alt="QR code"
    />
  );
}
