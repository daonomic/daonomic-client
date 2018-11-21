//@flow
import * as React from 'react';
import styles from './styles.css';

export type Props = {|
  qrCode: string,
|};

export class QrCode extends React.Component<Props> {
  render() {
    const { qrCode } = this.props;

    if (!qrCode) {
      return null;
    }

    return <img className={styles.root} src={qrCode} alt="QR code" />;
  }
}
