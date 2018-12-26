//@flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Heading } from '~/components/heading';
import textStyles from '~/components/text/text.css';
import styles from './styles.css';

export type Props = {
  userWalletAddress: ?string,
};

export class PaymentInstruction extends React.Component<Props> {
  render() {
    const { userWalletAddress, ...restProps } = this.props;

    return (
      <div {...restProps}>
        <Heading className={styles.title} tagName="h3" size="small">
          <Trans>Payment Instruction</Trans>
        </Heading>

        <p>
          <Trans>
            After your payment will be completed you will get tokens to the
            selected ethereum address:
          </Trans>
        </p>
        <p className={textStyles['word-break-all']}>
          {userWalletAddress || ''}
        </p>
      </div>
    );
  }
}
