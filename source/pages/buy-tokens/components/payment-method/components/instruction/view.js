//@flow
import * as React from 'react';
// $FlowFixMe
import { Trans } from '@lingui/macro';
import { Heading } from '~/components/heading';
import { markerTreeContext } from '~/providers/marker-tree';
import { Address } from '~/components/address';
import styles from './styles.css';

export type Props = {
  userWalletAddress: ?string,
};

export class PaymentInstruction extends React.Component<Props> {
  render() {
    const { userWalletAddress, ...restProps } = this.props;

    return (
      <markerTreeContext.Consumer>
        {({ markerCreator }) => (
          <div {...restProps} data-marker={markerCreator('instruction')()}>
            <Heading className={styles.title} tagName="h3" size="small">
              <Trans>Payment Instruction</Trans>
            </Heading>

            <p>
              <Trans>
                After your payment will be completed you will get tokens to the
                selected ethereum address{' '}
                <Address address={userWalletAddress || ''} />
              </Trans>
            </p>
          </div>
        )}
      </markerTreeContext.Consumer>
    );
  }
}
